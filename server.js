const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${timestamp}-${name}${ext}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido'));
        }
    }
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Arquivo de dados
const dataFile = 'certificados.json';

// Inicializar arquivo de dados
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Função para ler certificados
function readCertificates() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler certificados:', err);
        return [];
    }
}

// Função para salvar certificados
function saveCertificates(certs) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(certs, null, 2));
    } catch (err) {
        console.error('Erro ao salvar certificados:', err);
    }
}

// ============ ROTAS API ============

// GET - Obter todos os certificados
app.get('/api/certificados', (req, res) => {
    try {
        const certs = readCertificates();
        res.json(certs);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter certificados' });
    }
});

// POST - Adicionar novo certificado
app.post('/api/certificados', upload.array('files', 5), (req, res) => {
    try {
        const { title, platform, date, category, link } = req.body;

        if (!title || !platform) {
            // Deletar arquivos se dados inválidos
            if (req.files) {
                req.files.forEach(file => {
                    fs.unlink(path.join('uploads', file.filename), () => {});
                });
            }
            return res.status(400).json({ error: 'Título e plataforma são obrigatórios' });
        }

        const cert = {
            id: Date.now(),
            title,
            platform,
            date,
            category,
            link,
            files: req.files ? req.files.map(file => ({
                originalName: file.originalname,
                filename: file.filename,
                type: file.mimetype,
                size: file.size,
                path: `/uploads/${file.filename}`
            })) : []
        };

        const certs = readCertificates();
        certs.unshift(cert);
        saveCertificates(certs);

        res.json(cert);
    } catch (err) {
        console.error('Erro ao adicionar certificado:', err);
        res.status(500).json({ error: 'Erro ao adicionar certificado' });
    }
});

// DELETE - Deletar certificado
app.delete('/api/certificados/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let certs = readCertificates();
        const cert = certs.find(c => c.id === id);

        if (!cert) {
            return res.status(404).json({ error: 'Certificado não encontrado' });
        }

        // Deletar arquivos associados
        if (cert.files) {
            cert.files.forEach(file => {
                const filePath = path.join('uploads', file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Erro ao deletar arquivo:', err);
                });
            });
        }

        // Remover do JSON
        certs = certs.filter(c => c.id !== id);
        saveCertificates(certs);

        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao deletar certificado:', err);
        res.status(500).json({ error: 'Erro ao deletar certificado' });
    }
});

// DELETE - Deletar arquivo específico de um certificado
app.delete('/api/certificados/:id/file/:fileIndex', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const fileIndex = parseInt(req.params.fileIndex);
        
        let certs = readCertificates();
        const cert = certs.find(c => c.id === id);

        if (!cert || !cert.files[fileIndex]) {
            return res.status(404).json({ error: 'Arquivo não encontrado' });
        }

        const file = cert.files[fileIndex];
        const filePath = path.join('uploads', file.filename);

        // Deletar arquivo físico
        fs.unlink(filePath, (err) => {
            if (err) console.error('Erro ao deletar arquivo:', err);
        });

        // Remover referência do JSON
        cert.files.splice(fileIndex, 1);
        saveCertificates(certs);

        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao deletar arquivo:', err);
        res.status(500).json({ error: 'Erro ao deletar arquivo' });
    }
});

// UPDATE - Atualizar certificado
app.put('/api/certificados/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, platform, date, category, link } = req.body;

        if (!title || !platform) {
            return res.status(400).json({ error: 'Título e plataforma são obrigatórios' });
        }

        let certs = readCertificates();
        const cert = certs.find(c => c.id === id);

        if (!cert) {
            return res.status(404).json({ error: 'Certificado não encontrado' });
        }

        cert.title = title;
        cert.platform = platform;
        cert.date = date;
        cert.category = category;
        cert.link = link;

        saveCertificates(certs);
        res.json(cert);
    } catch (err) {
        console.error('Erro ao atualizar certificado:', err);
        res.status(500).json({ error: 'Erro ao atualizar certificado' });
    }
});

// Tratamento de erro do multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Erro ao fazer upload do arquivo' });
    }
    next(err);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Pasta de uploads: ${path.resolve('uploads')}`);
    console.log(`💾 Dados salvos em: ${path.resolve(dataFile)}`);
});
