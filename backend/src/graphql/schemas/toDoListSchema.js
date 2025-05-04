const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    completed: Boolean # Campo para indicar se a tarefa está concluída
    priority: String # Campo para prioridade
    dateTime: String # Campo para data e hora
  }

  input ItemInput {
    id: Int
    name: String
    completed: Boolean
    priority: String
    dateTime: String
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
    toggleComplete(id: Int!): Boolean # Alternar o status de conclusão
    setPriority(id: Int!, priority: String!): Boolean # Definir prioridade
  }
`;

module.exports = typeDefs;
