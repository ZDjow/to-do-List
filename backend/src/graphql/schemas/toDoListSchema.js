const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    completed: Boolean # Novo campo para indicar se a tarefa está concluída
  }

  input ItemInput {
    id: Int
    name: String
    completed: Boolean # Novo campo no input
  }

  input ItemFilter {
    name: String
  }

  type Query {
    todoList(filter: ItemFilter): [Item]
  }

  type Mutation {
    addItem(values: ItemInput): Boolean
    updateItem(values: ItemInput): Boolean
    deleteItem(id: Int!): Boolean
    toggleComplete(id: Int!): Boolean # Nova mutação para alternar o status de conclusão
  }
`;

module.exports = typeDefs;
