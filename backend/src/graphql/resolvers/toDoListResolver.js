const {
  addItem,
  updateItem,
  deleteItem,
  filterItems,
  toggleComplete,
  setPriority,
} = require("../../business/toDoListRegras");

const resolvers = {
  Query: {
    todoList: (_, { filter }) => filterItems(filter),
  },

  Mutation: {
    addItem: (_, { values: { name, priority, dateTime } }) =>
      addItem(name, priority, dateTime),
    updateItem: (_, { values: { id, name } }) => updateItem(id, name),
    deleteItem: (_, { id }) => deleteItem(id),
    toggleComplete: (_, { id }) => toggleComplete(id), // Resolver para alternar o status
    setPriority: (_, { id, priority }) => setPriority(id, priority), // Resolver para definir prioridade
  },
};

module.exports = resolvers;
