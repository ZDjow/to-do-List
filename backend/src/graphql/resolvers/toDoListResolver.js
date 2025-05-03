const {
  addItem,
  updateItem,
  deleteItem,
  filterItems,
  toggleComplete,
} = require("../../business/toDoListRegras");

const resolvers = {
  Query: {
    todoList: (_, { filter }) => filterItems(filter),
  },

  Mutation: {
    addItem: (_, { values: { name } }) => addItem(name),
    updateItem: (_, { values: { id, name } }) => updateItem(id, name),
    deleteItem: (_, { id }) => deleteItem(id),
    toggleComplete: (_, { id }) => toggleComplete(id), // Resolver para alternar o status
  },
};

module.exports = resolvers;
