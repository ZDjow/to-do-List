# To-Do List

Esse projeto é uma To-Do List funcional para auxiliar nas tarefas do dia a dia.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/docs)
- [GraphQL](https://graphql.org/)
- [React](https://react.dev/)

## Como Rodar o Projeto

1. **Pré-requisitos**:

   - Certifique-se de ter o [Node.js](https://nodejs.org/en/download) instalado em sua máquina.

2. **Configuração do Backend**:

   - Navegue até a pasta `backend`:
     ```bash
     cd backend
     ```
   - Instale as dependências:
     ```bash
     yarn install
     ```
   - Inicie o servidor do backend:
     ```bash
     yarn start
     ```
   - O backend estará disponível em `http://localhost:4000/graphql`.

3. **Configuração do Frontend**:

   - Navegue até a pasta frontend:
     ```bash
     cd frontend
     ```
   - Instale as dependências:
     ```bash
     yarn install
     ```
   - Crie o arquivo `.env` na pasta frontend com o seguinte conteúdo:
     ```
     REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
     ```
   - Inicie o servidor do frontend:
     ```bash
     yarn start
     ```
   - O frontend estará disponível em `http://localhost:3000`.

---

Atenciosamente,  
Djonathan Zuchi.
