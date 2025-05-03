const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    completed: Boolean # Novo campo para indicar se a tarefa está concluída
    priority: String # Novo campo para prioridade
  }

  input ItemInput {
    id: Int
    name: String
    completed: Boolean # Novo campo no input
    priority: String # Novo campo no input
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
    setPriority(id: Int!, priority: String!): Boolean # Nova mutação para definir prioridade
  }
`;

module.exports = typeDefs;
