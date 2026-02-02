# 📦 MyVerse API – Backend

API RESTful para o [MyVerse Interface](https://github.com/Allysson-ryan/MyVerse-Interface), uma aplicação pessoal para gerenciamento de resenhas e lista de desejos de livros, filmes e séries.  
Permite aos usuários cadastrar, editar, visualizar e remover projetos em consumo ou desejados, com autenticação via Google.

---

## 📑 Sumário

- [🚀 Sobre o Projeto](#-sobre-o-projeto)
- [📚 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [📌 Funcionalidades da API](#-funcionalidades-da-api)
- [📦 Instalação e Uso](#-instalação-e-uso)
- [🔐 Autenticação e Segurança](#-autenticação-e-segurança)
- [🛠️ Regras de Negócio](#️-regras-de-negócio)
- [📮 Rotas da API](#-rotas-da-api)

---

## 🚀 Sobre o Projeto

A **MyVerse API** é o backend que alimenta a aplicação MyVerse — um site onde usuários registram suas experiências com mídias consumidas (resenhas) ou que desejam consumir no futuro.  
O backend foi construído com foco em boas práticas, organização de código, segurança e validação de dados.

**Principais recursos:**

- Autenticação via Google OAuth 2.0
- Cadastro e gestão de resenhas (projetos consumidos)
- Lista de desejos personalizada
- Filtros, pesquisa e categorização
- API segura, modular e pronta para produção

---

## 📚 Tecnologias Utilizadas

| Ferramenta                      | Descrição                        |
| ------------------------------- | -------------------------------- |
| **Node.js**                     | Ambiente de execução             |
| **Express.js**                  | Framework de rotas e middlewares |
| **MongoDB + Mongoose**          | Banco de dados e modelagem ODM   |
| **Passport + Google OAuth 2.0** | Autenticação via conta Google    |
| **JWT**                         | Geração e verificação de tokens  |
| **dotenv**                      | Variáveis de ambiente seguras    |
| **cors**                        | Permitir acesso entre domínios   |
| **cookie-parser**               | Manipulação de cookies           |
| **bcrypt**                      | Hash de dados sensíveis          |
| **Nodemon**                     | Hot reload em ambiente de dev    |

---

## 📁 Estrutura de Pastas

```
src/
├── config/            # Configurações gerais (DB, auth)
├── controllers/       # Lógica das rotas
├── middlewares/       # Proteção de rotas, validações
├── models/            # Schemas do MongoDB
├── routes/            # Endpoints organizados por recurso
├── services/          # Regras e lógica de negócio
├── app.js             # Arquivo principal da aplicação
```

---

## 📌 Funcionalidades da API

- [x] Autenticação com Google OAuth
- [x] CRUD completo de resenhas
- [x] CRUD completo de itens desejados
- [x] Filtro e pesquisa por nome, status ou categoria
- [x] Validação de dados e nomes únicos por usuário
- [x] Proteção de rotas com middleware JWT

---

## 📦 Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/api-myverse.git

# Acesse a pasta
cd api-myverse

# Instale as dependências
npm install

# Configure as variáveis de ambiente no .env
touch .env
```

```bash
# Execute a aplicação em ambiente de desenvolvimento
npm run dev
```

A aplicação estará disponível em: `http://localhost:3333`

---

## 🔐 Autenticação e Segurança

- Utiliza **Google OAuth 2.0** via Passport.js
- As sessões são autenticadas com **JWT**, armazenado em cookies
- Rotas protegidas com middleware `authMiddleware.js`
- Dados sensíveis protegidos com variáveis de ambiente `.env`

---

## 🛠️ Regras de Negócio

- Projetos devem ter **nome único por usuário**
- Um projeto pode ser apenas **Resenha** ou **Desejado**
- Status "Consumindo" exige data de início
- Status "Concluído" exige data de início, término e nota
- Um projeto pode ser sugerido como concluído ao atingir o total de páginas/episódios

---

## 📮 Rotas da API

### 🔐 Autenticação

| Método | Rota                    | Descrição                       |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/auth/google`          | Inicia login com Google         |
| GET    | `/auth/google/callback` | Callback do Google com token    |
| GET    | `/auth/me`              | Retorna dados do usuário logado |
| POST   | `/auth/logout`          | Realiza logout                  |

### 📚 Resenhas

| Método | Rota              | Descrição                 |
| ------ | ----------------- | ------------------------- |
| GET    | `/reviews`        | Lista resenhas do usuário |
| GET    | `/reviews/latest` | Últimas 5 resenhas        |
| GET    | `/reviews/:id`    | Detalhes da resenha       |
| POST   | `/reviews`        | Criar nova resenha        |
| PUT    | `/reviews/:id`    | Editar resenha            |
| DELETE | `/reviews/:id`    | Apagar resenha            |

### 🎯 Wishlist (Desejos)

| Método | Rota            | Descrição        |
| ------ | --------------- | ---------------- |
| GET    | `/wishlist`     | Lista de desejos |
| POST   | `/wishlist`     | Adicionar item   |
| PUT    | `/wishlist/:id` | Editar item      |
| DELETE | `/wishlist/:id` | Remover item     |

### 🗂️ Categorias

| Método | Rota              | Descrição        |
| ------ | ----------------- | ---------------- |
| GET    | `/categories`     | Lista categorias |
| POST   | `/categories`     | Criar categoria  |
| PUT    | `/categories/:id` | Editar categoria |
| DELETE | `/categories/:id` | Apagar categoria |

### ✅ Validação

## 📫 Screenshot do fluxograma da Api

![screenshot](/src/assets/fluxograma-Myverse.png)


| Método | Rota                      | Descrição                  |
| ------ | ------------------------- | -------------------------- |
| GET    | `/validate-name?name=xyz` | Verifica se nome já existe |

---
