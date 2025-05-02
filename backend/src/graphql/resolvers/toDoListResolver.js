const {
  addItem,
  updateItem,
  deleteItem,
  filterItems,
} = require("../../business/toDoListRegras");

const resolvers = {
  Query: {
    todoList: (_, { filter }) => filterItems(filter),
  },

  Mutation: {
    addItem: (_, { values: { name } }) => addItem(name),
    updateItem: (_, { values: { id, name } }) => updateItem(id, name),
    deleteItem: (_, { id }) => deleteItem(id),
  },
};

module.exports = resolvers;
