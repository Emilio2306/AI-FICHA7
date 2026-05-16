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
src/
├── App.jsx                          # Router principal
├── main.jsx                         # Entry point (importa Bootstrap + theme.css)
│
├── components/
│   ├── layout/
│   │   └── Topbar.jsx               # Navbar sticky com blur
│   ├── movie/
│   │   ├── MovieForm.jsx            # Form partilhado Create/Edit
│   │   ├── MovieTable.jsx           # Vista em tabela
│   │   ├── MovieGrid.jsx            # Vista em grid (posters)
│   │   ├── MovieFilters.jsx         # Pesquisa + filtro por género
│   │   ├── MovieListSkeleton.jsx
│   │   ├── MovieFormSkeleton.jsx
│   │   └── MovieDetailSkeleton.jsx
│   └── ui/
│       └── ConfirmModal.jsx         # Modal genérico de confirmação
│
├── contexts/
│   └── ToastContext.jsx             # Sistema de notificações global
│
├── hooks/
│   └── useLocalStorage.js           # Hook para persistência de preferências
│
├── pages/
│   ├── MovieList.jsx                # /filmes
│   ├── MovieDetail.jsx              # /filmes/:id
│   ├── MovieCreate.jsx              # /filmes/novo
│   ├── MovieEdit.jsx                # /filmes/editar/:id
│   └── GenderList.jsx               # /generos
│
├── services/
│   └── api.js                       # Cliente axios + funções por entidade
│
├── styles/
│   └── theme.css                    # Tema dark cinema (sobrepõe Bootstrap)
│
└── utils/
└── validators.js                # Helpers de validação client-side
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
## 🧩 Componentes-chave

### `services/api.js`
Cliente axios único com `baseURL` da env, timeout de 10s e interceptor de erros. Expõe:
- `moviesApi.list() / getById() / create() / update() / remove()`
- `gendersApi.list() / getById() / create() / update() / remove()`
- `assetUrl(path)` para construir URLs de imagens.

### `contexts/ToastContext.jsx`
Sistema de notificações. Em qualquer componente:
```jsx
const toast = useToast()
toast.success('Filme criado!')
toast.error('Algo correu mal')
```

### `components/movie/MovieForm.jsx`
Form partilhado entre criação e edição. Recebe `initialValues`, `onSubmit`, `submitLabel`, `requireImage`, etc. Integra validação client-side e contagem de caracteres.

### `components/ui/ConfirmModal.jsx`
Modal de confirmação genérico, controlado por props (`show`, `onConfirm`, `onCancel`, `confirmVariant`). Reutilizado em filmes e géneros.

---

## 🎨 Tema

Todo o esquema visual vive em `src/styles/theme.css` via CSS variables:

```css
:root {
  --bg-base: #0A0B0F;
  --bg-elevated: #14161D;
  --accent: #E50914;       /* vermelho cinema */
  --text-primary: #E8E8EC;
  /* ... */
}
```

Mudar a paleta inteira = editar o bloco `:root`.

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