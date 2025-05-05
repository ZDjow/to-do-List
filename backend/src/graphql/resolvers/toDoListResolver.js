import {
  addItem,
  updateItem,
  deleteItem,
  filterItems,
  toggleComplete,
  setPriority,
} from "../../business/toDoListRegras.js";

const resolvers = {
  Query: {
    todoList: (_, { filter }) => filterItems(filter),
  },

  Mutation: {
    addItem: (_, { values: { name, priority, dateTime } }) =>
      addItem(name, priority, dateTime),
    updateItem: (_, { values: { id, name, dateTime } }) =>
      updateItem(id, name, dateTime),
    deleteItem: (_, { id }) => deleteItem(id),
    toggleComplete: (_, { id }) => toggleComplete(id), // Resolver para completar ou não tarefa.
    setPriority: (_, { id, priority }) => setPriority(id, priority), // Resolver para definir prioridade.
  },
};

export default resolvers;
