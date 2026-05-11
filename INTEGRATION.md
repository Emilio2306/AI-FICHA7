# 🔌 Integration Guide — AI2 API

Este documento descreve como interagir com a API do projeto AI2, com exemplos práticos usando **curl**, **JavaScript (fetch/axios)** e **Postman**.

---

## Base URL

```
http://localhost:3000
```

---

## 🎭 Géneros

### Listar todos os géneros

```http
GET /list-genders/test
```

**Resposta (200)**
```json
[
  { "id": 1, "name": "Action" },
  { "id": 2, "name": "Comedy" },
  { "id": 3, "name": "Drama" }
]
```

**Exemplo com fetch (JavaScript)**
```javascript
const response = await fetch('http://localhost:3000/list-genders/test');
const genres = await response.json();
console.log(genres);
```

**Exemplo com curl**
```bash
curl http://localhost:3000/list-genders/test
```

---

## 🎬 Filmes

### Listar todos os filmes

```http
GET /movies/list-movies
```

**Resposta (200)**
```json
[
  {
    "id": 1,
    "title": "Titanic",
    "image": "/uploads/titanic.jpg",
    "description": "Um épico romantico...",
    "genderId": 6,
    "createdAt": "2026-05-11T12:00:00.000Z",
    "updatedAt": "2026-05-11T12:00:00.000Z"
  }
]
```

---

### Obter filme por ID

```http
GET /movies/movie/:id
```

**Exemplo**
```bash
curl http://localhost:3000/movies/movie/1
```

**Resposta (404)** — se não existir
```json
{ "error": "Movie not found" }
```

---

### Listar filmes por género

```http
GET /movies/movies/gender/:genderId
```

**Exemplo**
```bash
curl http://localhost:3000/movies/movies/gender/2
```

---

### Criar filme (com imagem)

```http
POST /movies/create-movie
Content-Type: multipart/form-data
```

| Campo       | Tipo   | Obrigatório | Descrição              |
|-------------|--------|-------------|------------------------|
| title       | string | ✅          | Título do filme        |
| genderId    | number | ✅          | ID do género           |
| description | string | ✅          | Descrição              |
| file        | imagem | ✅          | PNG, JPG, JPEG ou WEBP |

**Exemplo com curl**
```bash
curl -X POST http://localhost:3000/movies/create-movie \
  -F "title=Inception" \
  -F "genderId=5" \
  -F "description=Um sonhador entra nos sonhos..." \
  -F "file=@/caminho/para/imagem.jpg"
```

**Exemplo com axios (JavaScript)**
```javascript
const formData = new FormData();
formData.append('title', 'Inception');
formData.append('genderId', 5);
formData.append('description', 'Um sonhador entra nos sonhos...');
formData.append('file', ficheiroDaImagem); // input type="file"

const response = await axios.post('http://localhost:3000/movies/create-movie', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Resposta (201)**
```json
{
  "id": 11,
  "title": "Inception",
  "image": "/uploads/inception.jpg",
  "description": "Um sonhador entra nos sonhos...",
  "genderId": 5,
  "createdAt": "2026-05-11T12:00:00.000Z",
  "updatedAt": "2026-05-11T12:00:00.000Z"
}
```

**Erros possíveis**
```json
{ "error": "Image is required" }
{ "error": "A movie with this title already exists" }
{ "error": "Invalid genderId" }
```

---

### Atualizar filme

```http
PUT /movies/update-movie/:id
Content-Type: multipart/form-data
```

> Todos os campos são **opcionais** — só envias o que queres alterar.

**Exemplo com curl**
```bash
curl -X PUT http://localhost:3000/movies/update-movie/1 \
  -F "title=Titanic Remastered"
```

**Resposta (200)**
```json
{ "message": "Movie updated successfully" }
```

**Resposta (404)**
```json
{ "error": "Movie not found" }
```

---

### Eliminar filme

```http
DELETE /movies/delete-movie/:id
```

**Exemplo com curl**
```bash
curl -X DELETE http://localhost:3000/movies/delete-movie/1
```

**Resposta (200)**
```json
{ "message": "Movie deleted successfully" }
```

---

## ⚠️ Códigos de Estado HTTP

| Código | Significado                          |
|--------|--------------------------------------|
| 200    | OK — pedido bem sucedido             |
| 201    | Created — recurso criado             |
| 400    | Bad Request — dados inválidos        |
| 404    | Not Found — recurso não encontrado   |
| 500    | Internal Server Error — erro do servidor |

---

## 🧪 Testar com Postman

1. Importa os pedidos manualmente usando os endpoints acima
2. Para pedidos com imagem, escolhe **Body → form-data** no Postman
3. Adiciona o campo `file` com o tipo **File** (não Text)

---

## 🔗 Health Check

```bash
curl http://localhost:3000/health
# Resposta: "Api a funcionar!"
```
