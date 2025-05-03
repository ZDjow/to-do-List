const { TODO_LIST } = require("../data/preData");
const {
  validateNameIsNotEmpty,
  validateNameIsUnique,
} = require("../utils/validations");

/**
 * Gera um número inteiro para utilizar de id.
 */
function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

/**
 * Adiciona um item à lista de tarefas.
 * @param {string} name - Nome do item a ser adicionado.
 * @returns {boolean} - Retorna true se o item for adicionado com sucesso.
 */
function addItem(name) {
  validateNameIsNotEmpty(name);
  validateNameIsUnique(name, TODO_LIST);

  TODO_LIST.push({
    id: getRandomInt(),
    name,
  });

  console.log(`Item "${name}" adicionado com sucesso.`);
  return true;
}

/**
 * Atualiza um item da lista de tarefas.
 * @param {number} id - ID do item a ser atualizado.
 * @param {string} name - Novo nome do item.
 * @returns {boolean} - Retorna true se o item for atualizado com sucesso.
 */
function updateItem(id, name) {
  validateNameIsNotEmpty(name);
  validateNameIsUnique(name, TODO_LIST, id);

  const itemIndex = TODO_LIST.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    throw new Error(`Edição cancelada por não existir tarefa com o ID ${id}.`);
  }

  TODO_LIST[itemIndex].name = name;
  console.log(`Tarefa com o ID ${id} atualizada para: ${name}`);
  return true;
}

/**
 * Remove um item da lista de tarefas.
 * @param {number} id - ID do item a ser removido.
 * @returns {boolean} - Retorna true se o item for removido com sucesso.
 */
function deleteItem(id) {
  const index = TODO_LIST.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`A tarefa com o ID ${id} não foi encontrada.`);
  }

  TODO_LIST.splice(index, 1);
  console.log(`A tarefa com o ID ${id} foi removida da lista.`);
  return true;
}

/**
 * Filtra itens da lista de tarefas.
 * @param {Object} filter - Filtro para buscar itens.
 * @returns {Array} - Retorna a lista de itens filtrados.
 */
function filterItems(filter) {
  if (filter && filter.name) {
    return TODO_LIST.filter((item) =>
      item.name.toLowerCase().includes(filter.name.toLowerCase())
    );
  }
  return TODO_LIST;
}

/**
 * Alterna o status de conclusão de um item.
 * @param {number} id - ID do item a ser alternado.
 * @returns {boolean} - Retorna true se o status for alterado com sucesso.
 */
function toggleComplete(id) {
  const item = TODO_LIST.find((item) => item.id === id);
  if (!item) {
    throw new Error(`A tarefa com o ID ${id} não foi encontrada.`);
  }

  item.completed = !item.completed; // Alterna o status de conclusão
  console.log(
    `O status da tarefa com o ID ${id} foi alterado para: ${item.completed}`
  );
  return true;
}

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  filterItems,
  toggleComplete,
};
