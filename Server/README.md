# FICHA 7 - APLICAÇÕES PARA A INTERNET II

Objetivo: Node + Express + React 

# ESTRUTURA REPOSITORIO
`Server`-— Backend (Node.js + Express + Sequelize + PostgreSQL)

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+ a correr localmente
- Uma base de dados criada no PostgreSQL chamada `AI2`

### Passos
##  1. Como correr

```bash
npm install
cp .env.example .env       # editar com credenciais da BD
node src/seed/seed.js      # popular géneros iniciais (opcional)
npm run dev
```
Servidor em `http://localhost:3000`. Health check: `GET /health`.

2. Garantir que existe a base de dados `AI2` no PostgreSQL local. Se não existir, no `psql`:
```sql
   CREATE DATABASE "AI2";
```
## ⚙️ Variáveis de ambiente

Ver `.env.example`:

| Variável | Default | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor Express |
| `DB_NAME` | `AI2` | Nome da base de dados |
| `DB_USER` | `postgres` | Utilizador PostgreSQL |
| `DB_PASSWORD` | — | Password PostgreSQL |
| `DB_HOST` | `localhost` | Host da BD |
| `DB_PORT` | `5432` | Porta da BD |
| `UPLOAD_FOLDER` | `uploads` | Pasta de destino dos uploads |

---
3. Popular a base de dados com dados de teste:
```bash
   npm run seed -- --force
```
   ⚠️ A flag `--force` apaga e recria todas as tabelas. Usa só em desenvolvimento.

4. Arrancar o servidor:
```bash
   npm run dev
```
src/
├── config/
│   └── database.js          # Instância Sequelize
├── controllers/
│   ├── movieController.js   # Lógica de filmes (CRUD)
│   └── genderController.js  # Lógica de géneros (CRUD)
├── middlewares/
│   └── uploadMiddleware.js  # Multer (configuração e validação)
├── models/
│   ├── movie.js             # Model Filme
│   ├── gender.js            # Model Género
│   └── index.js             # Associações entre models
├── routes/
│   ├── movieRoute.js        # /filmes/* e /filme/*
│   └── genderRoute.js       # /generos/* e /genero/*
├── seed/
│   └── seed.js              # População inicial da BD
└── index.js                 # Entry point Express

**Relação:** `Filme.belongsTo(Genero)` e `Genero.hasMany(Filme)`.

> 💡 Os filmes vêm sempre com `include: [{ model: Gender, as: 'gender' }]` para que o frontend tenha acesso direto a `movie.gender.description`.

---

## 📂 Uploads

Imagens carregadas via `POST /filme/create` ou `PUT /filme/update/:id` são guardadas em `Server/uploads/` e servidas como ficheiros estáticos via `GET /uploads/<filename>`.

Formatos aceites: PNG, JPG, JPEG, WEBP. Tamanho máximo: 5 MB (validado também client-side).

---

## 🔌 CORS

## 👤 Autor
EMILIO FERNANDO

Por defeito, aceita apenas pedidos de `http://localhost:5173` (origem do frontend Vite). Para alterar, edita `src/index.js