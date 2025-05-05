const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    completed: Boolean # Campo para indicar se a tarefa está concluída.
    priority: String # Campo para prioridade.
    dateTime: String # Campo para data e hora.
    createdAt: String # Auditoria de criação.
    updatedAt: String # Auditoria de modificação.
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
    alterarConclusao(id: Int!): Boolean # Completar ou não tarefa.
    setPriority(id: Int!, priority: String!): Boolean # Definir prioridade.
  }
`;

export default typeDefs;
