# FICHA 7 - APLICAÇÕES PARA A INTERNET II

Objetivo: Node + Express + React 

# ESTRUTURA REPOSITORIO
`Server`-— Backend (Node.js + Express + Sequelize + PostgreSQL)

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+ a correr localmente
- Uma base de dados criada no PostgreSQL chamada `AI2`

### Passos

1. Clonar e instalar:
```bash
   git clone https://github.com/Emilio2306/AI-FICHA7.git
   cd AI-FICHA7
   npm install
```
2. Garantir que existe a base de dados `PINT` no PostgreSQL local. Se não existir, no `psql`:
```sql
   CREATE DATABASE "PINT";
```

3. Popular a base de dados com dados de teste:
```bash
   npm run seed -- --force
```
   ⚠️ A flag `--force` apaga e recria todas as tabelas. Usa só em desenvolvimento.

4. Arrancar o servidor:
```bash
   npm run dev
```
