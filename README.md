# 🎬 AI2 — Gestão de Filmes

Aplicação fullstack para gestão de filmes com upload de imagem, desenvolvida com **Node.js + Express + Sequelize + PostgreSQL** no backend e **React + Vite** no frontend.

---

## 📁 Estrutura do Repositório

```
Project/
├── Server/          → Backend (API REST)
│   └── src/
│       ├── config/        → Ligação à base de dados
│       ├── controllers/   → Lógica de negócio
│       ├── middlewares/   → Upload de imagens (Multer)
│       ├── models/        → Modelos Sequelize (Movie, Gender)
│       ├── routes/        → Definição das rotas HTTP
│       ├── seed/          → Dados de teste
│       └── index.js       → Ponto de entrada do servidor
│
├── Frontend/                # SPA React + Vite
│   ├── src/
│   │   ├── components/      # MovieForm, MovieTable, MovieGrid, ConfirmModal...
│   │   ├── contexts/        # ToastContext
│   │   ├── hooks/           # useLocalStorage
│   │   ├── pages/           # MovieList, MovieDetail, MovieCreate, MovieEdit, GenderList
│   │   ├── services/        # api.js (axios client centralizado)
│   │   ├── styles/          # theme.css (dark cinema)
│   │   └── utils/           # validators.js
│   └── README.md
│
├── INTEGRATION.md           # Documentação completa dos endpoints da API
└── README.md
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) 14+ a correr localmente
- Uma base de dados chamada `AI2` criada no PostgreSQL

---

## 🚀 Instalação e Configuração

### 1. Instalar pré-requisitos
...

### 2. Configurar variáveis de ambiente

Dentro da pasta `Server/`, cria um ficheiro `.env` com base no `.env.example`:

```bash
cd Server
cp .env.example .env
```

Edita o `.env` com as tuas credenciais do PostgreSQL:

```env
PORT=3000
DB_NAME=AI2
DB_USER=postgres
DB_PASSWORD=a_tua_password
DB_HOST=localhost
DB_PORT=5432
```

### 3. Instalar dependências do Backend

```bash
cd Server
npm install
```

### 4. Criar a base de dados (se não existir)

No terminal do PostgreSQL (`psql`):

```sql
CREATE DATABASE "AI2";
```

### 5. Popular a base de dados com dados de teste

```bash
npm run seed
```

> ⚠️ O seed usa `sync({ force: true })` — apaga e recria todas as tabelas. Usa **apenas em desenvolvimento**.

### 6. Arrancar o servidor

```bash
npm run dev
```

O servidor fica disponível em: `http://localhost:3000`

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

O frontend fica disponível em: `http://localhost:5173`

---

## 📡 Endpoints da API

### 🎭 Géneros (`/genders`)

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| GET    | `/genders/test` | Listar todos os géneros |

### 🎬 Filmes (`/movies`)

| Método | Rota                             | Descrição                          |
|--------|----------------------------------|------------------------------------|
| GET    | `/movies/list-movies`            | Listar todos os filmes             |
| GET    | `/movies/movie/:id`              | Obter filme por ID                 |
| GET    | `/movies/movies/gender/:genderId`| Listar filmes por género           |
| POST   | `/movies/create-movie`           | Criar filme (com imagem)           |
| PUT    | `/movies/update-movie/:id`       | Atualizar filme (com imagem)       |
| DELETE | `/movies/delete-movie/:id`       | Eliminar filme                     |

> Os endpoints de criação e atualização aceitam `multipart/form-data` com o campo `file` para a imagem.

---
**Extras implementados:**
- Dual-view (grid de posters + tabela) com persistência da preferência no localStorage
- Pesquisa por título/descrição em tempo real
- Filtro por género combinável com pesquisa
- Upload de imagens validado (PNG/JPG/WEBP, max 5MB)
- Validação client-side em todos os formulários
- Toasts para feedback de ações (success/error/warning/info)
- Skeleton loaders durante carregamentos
- Edição inline de géneros com atalhos de teclado (Enter/Escape)
- Página de detalhe responsiva com poster sticky em desktop
- Modal de confirmação para ações destrutivas
- Tema dark mode com paleta cinema (Letterboxd/Netflix inspired)

---
## 🗄️ Modelos da Base de Dados

### Gender
| Campo | Tipo    | Descrição       |
|-------|---------|-----------------|
| id    | INTEGER | Chave primária  |
| name  | STRING  | Nome do género  |

### Movie
| Campo       | Tipo    | Descrição                    |
|-------------|---------|------------------------------|
| id          | INTEGER | Chave primária               |
| title       | STRING  | Título do filme              |
| image       | STRING  | Caminho da imagem (upload)   |
| description | TEXT    | Descrição do filme           |
| genderId    | INTEGER | FK → Gender (1 género → N filmes) |

---

## 🛠️ Tecnologias Utilizadas

**Backend**
- [Express.js](https://expressjs.com/) — Framework HTTP
- [Sequelize](https://sequelize.org/) — ORM para PostgreSQL
- [Multer](https://github.com/expressjs/multer) — Upload de ficheiros
- [pg](https://node-postgres.com/) — Driver PostgreSQL
- [dotenv](https://github.com/motdotla/dotenv) — Variáveis de ambiente
- [nodemon](https://nodemon.io/) — Reinício automático em dev

**Frontend**
- [React 19](https://react.dev/) — Interface de utilizador
- [Vite](https://vitejs.dev/) — Bundler e servidor de dev
- [React Router DOM](https://reactrouter.com/) — Roteamento
- [Axios](https://axios-http.com/) — Pedidos HTTP
- [Bootstrap 5](https://getbootstrap.com/) — Estilos

---
## 🏗️ Decisões Arquiteturais

**Backend MVC.** Separação clara `routes → controllers → models`. Routes só conhecem URIs e middlewares; controllers só conhecem lógica de negócio; models só conhecem persistência.

**Camada de serviços centralizada no Frontend.** Todas as chamadas à API passam por `services/api.js` (axios client com `baseURL` da env). Trocar de ambiente = trocar `VITE_API_URL`.

**Componentização baseada na regra dos três.** Componentes só são extraídos quando o mesmo padrão aparece três vezes (`MovieForm` partilhado entre Create/Edit, `ConfirmModal` reusado em Filmes e Géneros).

**UI proporcional à complexidade dos dados.** Filmes (5 campos + imagem + descrição longa) têm páginas dedicadas. Géneros (1 campo de texto) têm uma única página com edição inline — evita over-engineering.

**Design system via CSS variables.** Tema completo definido em `:root` no `theme.css`. Mudar o esquema de cores = editar um bloco.

**Filtragem client-side.** Dataset pequeno justifica filtrar no browser (latência zero). Quando crescer, migra-se para query params no backend.

---

## 👤 Autor
EMILIO FERNANDO
 
GitHub: [@Emilio2306](https://github.com/Emilio2306)
