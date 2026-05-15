# 🎬 Cineteca — Sistema de Gestão de Filmes

Aplicação fullstack desenvolvida no âmbito da disciplina de **Aplicações para a Internet II** (Ficha de Trabalho nº 7) do curso de Engenharia Informática, IPV-ESTGV.

> Sistema CRUD completo de filmes e géneros, com upload de imagens, interface dark mode estilo cinema e arquitetura limpa baseada em separação Frontend/Backend.

---

## 🧱 Stack Técnica

### Backend
- **Node.js** + **Express** — servidor HTTP
- **PostgreSQL** + **Sequelize** ORM — persistência
- **Multer** — upload de imagens
- Arquitetura **MVC** (Model–View–Controller)

### Frontend
- **React 19** + **Vite** — UI
- **React Router 7** — navegação
- **Axios** — HTTP client
- **Bootstrap 5** + tema customizado **dark cinema**

---

## 📁 Estrutura
Project/
├── Server/                  # Backend Express
│   ├── src/
│   │   ├── config/          # Configuração da BD
│   │   ├── controllers/     # Lógica de cada rota
│   │   ├── middlewares/     # Multer (upload)
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # Express routers
│   │   ├── seed/            # Seeds da BD
│   │   └── index.js         # Entry point
│   ├── uploads/             # Imagens carregadas
│   └── .env                 # Variáveis (DB credentials)
│
├── Frontend/                # SPA React + Vite
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── layout/      # Topbar
│   │   │   ├── movie/       # MovieForm, MovieTable, Skeletons
│   │   │   └── ui/          # ConfirmModal
│   │   ├── contexts/        # ToastContext
│   │   ├── pages/           # MovieList, MovieCreate, MovieEdit, GenderList
│   │   ├── services/        # api.js (axios client)
│   │   ├── styles/          # theme.css
│   │   └── utils/           # validators.js
│   └── .env                 # VITE_API_URL
│
├── INTEGRATION.md           # Documentação dos endpoints
└── README.md
---

## 🚀 Como correr

### Pré-requisitos
- Node.js ≥ 18
- PostgreSQL ≥ 14

### 1. Backend

```bash
cd Server
cp .env.example .env       # editar com credenciais da BD
npm install
node src/seed/seed.js      # popular géneros iniciais (opcional)
npm start
```

Servidor a correr em `http://localhost:3000`.

### 2. Frontend

```bash
cd Frontend
cp .env.example .env       # ajustar VITE_API_URL se necessário
npm install
npm run dev
```

App acessível em `http://localhost:5173`.

---

## 🎯 Funcionalidades

| Recurso | Listar | Criar | Editar | Eliminar |
|---|---|---|---|---|
| Filmes | ✅ `/filmes` | ✅ `/filmes/novo` | ✅ `/filmes/editar/:id` | ✅ via modal |
| Géneros | ✅ `/generos` | ✅ inline | ✅ inline | ✅ via modal |

**Extras:**
- Upload de imagens com validação de tipo e tamanho (max 5MB, PNG/JPG/WEBP)
- Validação client-side em todos os formulários
- Sistema de notificações (toasts) para feedback
- Skeleton loaders durante carregamentos
- Edição inline de géneros com atalhos de teclado (Enter/Escape)
- Tema dark mode com paleta cinema (Letterboxd/Netflix inspired)

---

## 📡 API

Documentação completa dos endpoints em [`INTEGRATION.md`](./INTEGRATION.md).

| Recurso | Endpoint principal |
|---|---|
| Filmes | `GET /filmes/list` |
| Detalhe filme | `GET /filme/get/:id` |
| Criar filme | `POST /filme/create` (multipart) |
| Atualizar filme | `PUT /filme/update/:id` (multipart) |
| Eliminar filme | `DELETE /filme/delete/:id` |
| Géneros | `GET /generos/list` |

---

## 🏗️ Decisões Arquiteturais

**Backend MVC.** Separação clara `routes → controllers → models`. Routes só conhecem URIs e middlewares; controllers só conhecem a lógica de negócio; models só conhecem a persistência.

**Camada de serviços centralizada no Frontend.** Todas as chamadas à API passam por `services/api.js` (axios client com `baseURL` da env). Mudar de ambiente = mudar `VITE_API_URL`.

**Componentização baseada na regra do três.** Componentes extraídos quando o mesmo padrão aparece 3 vezes (`MovieForm` partilhado entre Create/Edit, `ConfirmModal` reusado em Filmes e Géneros).

**UI proporcional à complexidade dos dados.** Filmes (5 campos + imagem) têm páginas dedicadas. Géneros (1 campo de texto) têm uma única página com edição inline — evitar over-engineering.

**Design system via CSS variables.** Tema completo definido em `:root` no `theme.css`. Mudar o esquema de cores = editar um bloco.

---

## 📚 Conformidade com a Ficha de Trabalho nº 7

| Requisito | Estado |
|---|---|
| 1.1 — BD `ai2` em PostgreSQL | ✅ |
| 1.2 — Tabela `filmes` (id, descrição, título, foto, género) | ✅ |
| 1.3 — Tabela `generos` (id, descrição) com relação 1:N | ✅ |
| 2.1 — Projeto Node + Express com MVC | ✅ |
| 2.2 — CRUD completo de filmes e géneros | ✅ |
| 2.2.2 — URIs conforme tabela 1 da ficha | ✅ |
| 3.1 — Projeto React `frontend` | ✅ |
| 3.2 — Páginas: listagem, criação, edição | ✅ |
| 3.3 — Pedidos HTTP operacionais | ✅ |

---

## 👤 Autor
EMILIO FERNANDO

Trabalho académico — **IPV ESTGV**, Engenharia Informática, 2025/2026.