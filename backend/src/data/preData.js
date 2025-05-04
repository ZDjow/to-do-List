const TODO_LIST = [
  {
    id: 1,
    name: "Magrass - Unidade Soledade",
    completed: false,
    priority: "low",
    dateTime: new Date().toISOString(),
    createdAt: new Date().toISOString(), // Adiciona data de criação
    updatedAt: null, // Inicialmente nulo
  },
  {
    id: 2,
    name: "Espaço Laser - Unidade Catanduva",
    completed: false,
    priority: "medium",
    dateTime: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
];

module.exports = {
  TODO_LIST,
};
