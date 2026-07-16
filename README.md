# 📜 Portfólio de Certificados

Aplicação web para gerenciar e organizar seus certificados de cursos com armazenamento em pasta local. **Perfeita para hospedar no GitHub!**

## ✨ Funcionalidades

- ✅ **Adicionar certificados** com título, plataforma, data, categoria, link
- ✅ **Upload de imagens e PDFs** - Salvos em pasta local do projeto
- ✅ **Visualizar arquivos** - Imagens e PDFs
- ✅ **Deletar certificados** - Remove também os arquivos da pasta
- ✅ **Busca e filtros** - Por título, plataforma e categoria
- ✅ **Imprimir** - Layout otimizado para impressão
- ✅ **Modo escuro** - Tema claro/escuro
- ✅ **Responsivo** - Funciona em mobile, tablet e desktop
- ✅ **GitHub Ready** - Pronto para hospedar no GitHub

## 🌐 Colocando no GitHub

### 1. Crie um repositório vazio no GitHub
Vá em [github.com/new](https://github.com/new), dê um nome (ex: `portfolio-certificados`) e clique em "Create repository" **sem** marcar a opção de criar README (você já tem um).

### 2. No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeiro commit: Portfólio de Certificados"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio-certificados.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub.

### 3. Confira antes de enviar (opcional, mas recomendado)

```bash
git status
```

Deve aparecer para commit: `server.js`, `package.json`, `public/index.html`, `README.md`, `.gitignore`, `LICENSE`, `iniciar.bat`, `iniciar.sh`, `uploads/.gitkeep`.

**NÃO deve aparecer:** `node_modules/`, `certificados.json`, nenhum arquivo dentro de `uploads/` além do `.gitkeep`. Se aparecer, o `.gitignore` já está configurado para evitar isso — mas sempre bom checar.

### 4. Em outro computador (ou depois de reinstalar o SO)

```bash
git clone https://github.com/SEU-USUARIO/portfolio-certificados.git
cd portfolio-certificados
npm install
npm start
```

Seus certificados **não vêm juntos** (ficam só no computador onde você os adicionou) — é assim mesmo, pois são dados privados.

---

## 📋 Requisitos

- **Node.js** 14+
- **NPM** ou **Yarn**

## 🚀 Instalação Rápida

### 1. Clone ou extraia o projeto

```bash
# Se for git
git clone https://github.com/seu-usuario/portfolio-certificados.git
cd portfolio-certificados

# Ou descompacte o ZIP
unzip portfolio-certificados.zip
cd portfolio-certificados
```

### 2. Instale as dependências

```bash
npm install
```

Isso criará a pasta `node_modules` com tudo que você precisa.

### 3. Inicie o servidor

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📁 Pasta de uploads: /seu/caminho/uploads
💾 Dados salvos em: /seu/caminho/certificados.json
```

### 4. Abra no navegador

Vá para: **http://localhost:3000**

Pronto! 🎉

## 📁 Estrutura do Projeto

```
portfolio-certificados/
├── server.js              # Servidor Express
├── package.json           # Dependências
├── certificados.json      # Dados dos certificados
├── .gitignore            # Arquivos a ignorar no Git
├── README.md             # Este arquivo
├── public/
│   └── index.html        # Interface web
└── uploads/              # Pasta onde os PDFs/imagens ficam
    └── .gitkeep
```

## 🎯 Como Usar

### Adicionar Certificado

1. Clique em **➕ Adicionar**
2. Preencha os dados:
   - **Título** (obrigatório)
   - **Plataforma** (obrigatório) - ex: Udemy, Coursera
   - **Data** (opcional)
   - **Categoria** (opcional) - ex: Programação, Design
   - **Link** (opcional)
3. Clique em **📎 Selecionar arquivos** e escolha imagens ou PDFs
4. Clique em **✅ Adicionar**

### O que acontece:

- O arquivo é **enviado ao servidor**
- Fica salvo em `uploads/`
- Os dados são salvos em `certificados.json`
- Aparece na galeria

### Deletar Certificado

- Clique em **🗑️** no card
- O arquivo é **deletado da pasta** `uploads/`
- Os dados são removidos de `certificados.json`

### Ver Arquivo

- Clique em **👁️ Ver** ou na imagem do card
- Abre em modal para visualizar
- Para PDFs, tem botão para baixar

## 💾 Armazenamento de Dados

### Arquivo: `certificados.json`

Contém os dados dos certificados (metadados):

```json
[
  {
    "id": 1234567890,
    "title": "Python para Iniciantes",
    "platform": "Udemy",
    "date": "2024-01-15",
    "category": "Programação",
    "link": "https://udemy.com/...",
    "files": [
      {
        "originalName": "certificado.pdf",
        "filename": "1234567890-certificado.pdf",
        "type": "application/pdf",
        "size": 524288,
        "path": "/uploads/1234567890-certificado.pdf"
      }
    ]
  }
]
```

### Pasta: `uploads/`

Contém os **arquivos reais** dos certificados:

```
uploads/
├── 1234567890-certificado.pdf
├── 1234567891-print.png
└── 1234567892-comprovante.pdf
```

## 🌐 Hospedando no GitHub

### 1. Crie um repositório no GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/portfolio-certificados.git
git push -u origin main
```

### 2. O que é commitado:

✅ `server.js` - Código do servidor  
✅ `package.json` - Dependências  
✅ `public/index.html` - Interface  
✅ `.gitignore` - Configuração  
✅ `README.md` - Documentação  
✅ `uploads/.gitkeep` - Pasta (vazia)  

❌ `node_modules/` - Não commitado  
❌ `uploads/*.pdf` - Arquivos não commitados  
❌ `certificados.json` - Dados não commitados  

### 3. Para usar no outro computador

```bash
git clone https://github.com/seu-usuario/portfolio-certificados.git
cd portfolio-certificados
npm install
npm start
```

Pronto! Todos os seus arquivos estarão lá quando iniciar.

## 🔒 Privacidade

- ✅ Seus dados ficam no **seu computador**
- ✅ Nenhum arquivo é enviado para servidor externo
- ✅ Se hospedar no GitHub, ninguém consegue ver os PDFs (não estão lá)
- ✅ Apenas você tem acesso aos arquivos da pasta `uploads/`

## 🐛 Troubleshooting

### "Porta 3000 já está em uso"

Use outra porta:

```bash
PORT=3001 npm start
```

Depois acesse: http://localhost:3001

### "Erro ao fazer upload"

Verificar:
- Arquivo é imagem ou PDF?
- Arquivo tem menos de 50MB?
- Pasta `uploads/` existe?

### "Certificados desaparecem"

Se você deletou `certificados.json` ou a pasta `uploads/`:

```bash
# Recrie a pasta
mkdir uploads
# Crie o arquivo vazio
echo "[]" > certificados.json
```

### Node/NPM não reconhecido

Instale Node.js em: https://nodejs.org/

## 🚀 Desenvolvimento

### Usar modo watch (atualiza ao salvar):

```bash
npm run dev
```

Requer `nodemon` (já instalado em devDependencies).

### Modificar

- **Interface:** `public/index.html`
- **Servidor:** `server.js`
- **Estilos:** Dentro do `index.html` na tag `<style>`

## 📦 Fazer build para produção

Se quiser hospedar em um servidor real (Heroku, Railway, etc):

```bash
# Deixe como está, funciona direto
npm start
```

Se for usar variáveis de ambiente:

```bash
# .env
PORT=3000
NODE_ENV=production
```

## 📝 Licença

Livre para uso pessoal e comercial.

## 💡 Dicas

- **Exporte regularmente** - Faça backup do `certificados.json`
- **Organize categorias** - Use categorias consistentes
- **Comprima PDFs** - PDFs menores = mais rápido
- **Imagens 1280x720** - Boa resolução para galeria

## ❓ Dúvidas?

Tudo está funcionando normalmente! Se tiver problemas:

1. Verifique se Node.js está instalado: `node -v`
2. Verifique se está na pasta correta: `ls` (deve listar `server.js`)
3. Verifique os logs do terminal: `npm start`
4. Tente limpar: `rm -rf node_modules && npm install`

---

**Desenvolvido com ❤️ para organizar seus certificados**

Aproveite seu portfólio! 🎓
