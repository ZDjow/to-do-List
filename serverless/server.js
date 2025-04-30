const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { TODO_LIST } = require("./makeData");

/**
 * Gera um número inteiro para utilizar de id
 */
function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
  }

  input ItemInput {
    id: Int
    name: String
  }

  input ItemFilter {
    name: String #Retirei o id daqui e simplifiquei o filtro.
  }

  type Query {
    todoList(filter: ItemFilter): [Item]
  }

  type Mutation {
    addItem(values: ItemInput): Boolean
    updateItem(values: ItemInput): Boolean
    deleteItem(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    todoList: (_, { filter }) => {
      if (filter && filter.name) {
        // A busca do filtro é feita pelo nome.
        return TODO_LIST.filter((item) =>
          item.name.toLowerCase().includes(filter.name.toLowerCase())
        );
      }

      return TODO_LIST; //Se por algum motivo o filtro não for aplicado retorna a lista inteira.
    },
  },

  Mutation: {
    addItem: (_, { values: { name } }) => {
      if (!name || name.trim() === "") {
        // Verifica se o campo "digite aqui" não ficou em branco ou com espaços.
        throw new Error("Esse campo não pode ficar vazio.");
      }

      const itemExists = TODO_LIST.some(
        //Procura se tem outro item na lista com o mesmo nome ignorando maiúsculas e minúsculas.
        (item) => item.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (itemExists) {
        throw new Error(`A clínica "${name}" já foi pré-cadastrada.`);
      }

      TODO_LIST.push({
        id: getRandomInt(),
        name,
      });

      console.log(`Item "${name}" adicionado com sucesso.`);
      return true;
    },

    updateItem: (_, { values: { id, name } }) => {
      if (!name || name.trim() === "") {
        //Verificação pra não deixar vazio um item que já teve algum valor.
        throw new Error("O campo editado não pode ficar vazio!");
      }

      const itemExists = TODO_LIST.some(
        //Procura se tem outro item na lista com o mesmo nome ignorando maiúsculas e minúsculas.
        (item) =>
          item.id !== id &&
          item.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (itemExists) {
        throw new Error(`A clínica "${name}" já foi pré-cadastrada.`);
      }

      const itemIndex = TODO_LIST.findIndex((item) => item.id === id);
      if (itemIndex === -1) {
        //Encontra o item pelo id para depois editar na lista.
        throw new Error(
          `Edição cancelada por não existir clínica com o ID ${id}.`
        );
      }

      TODO_LIST[itemIndex].name = name;
      console.log(`Clínica com o ID ${id} atualizada para: ${name}`);
      return true;
    },

    deleteItem: (_, { id }) => {
      const index = TODO_LIST.findIndex((item) => item.id === id);
      if (index === -1) {
        //Encontra o item pelo id para depois excluir da lista.
        throw new Error(`A clínica com o ID ${id} não foi encontrada.`);
      }

      TODO_LIST.splice(index, 1);
      console.log(`A clínica com o ID ${id} foi removida da lista.`);
      return true;
    },
  },
};

// Configuração para subir o backend
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
