import TODO_LIST from "../data/preData.js";
import {
  validateNameIsNotEmpty,
  validateNameIsUnique,
} from "../utils/validations.js";

// Gera um número inteiro para utilizar de id.
function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

// Adiciona um item à lista de tarefas.
export function addItem(name, priority = "low", dateTime) {
  validateNameIsNotEmpty(name);
  validateNameIsUnique(name, TODO_LIST);

  // Verifica se a data e hora são válidos.
  const validDateTime =
    dateTime && !isNaN(new Date(dateTime).getTime())
      ? new Date(dateTime).toISOString()
      : new Date().toISOString();

  TODO_LIST.push({
    id: getRandomInt(),
    name,
    completed: false,
    priority,
    dateTime: validDateTime,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  });

  console.log(
    `Item "${name}" com prioridade "${priority}" e data/hora "${validDateTime}" adicionado com sucesso.`
  );
  return true;
}

// Atualiza um item da lista de tarefas.
export function updateItem(id, name, dateTime) {
  validateNameIsNotEmpty(name);
  validateNameIsUnique(name, TODO_LIST, id);

  const itemIndex = TODO_LIST.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    throw new Error(`Edição cancelada por não existir tarefa com o ID ${id}.`);
  }

  TODO_LIST[itemIndex].name = name;

  // Validação e atualização de data e hora se forem informadas.
  if (dateTime && !isNaN(new Date(dateTime).getTime())) {
    TODO_LIST[itemIndex].dateTime = new Date(dateTime).toISOString();
  } else {
    console.warn(`Data/hora inválida para o item com ID ${id}.`);
  }

  TODO_LIST[itemIndex].updatedAt = new Date().toISOString(); // Atualiza data de alteração da tarefa.

  console.log(
    `Tarefa com o ID ${id} atualizada para: ${name}, ${TODO_LIST[itemIndex].dateTime}`
  );

  return true;
}

// Remove um item da lista de tarefas.
export function deleteItem(id) {
  const index = TODO_LIST.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`A tarefa com o ID ${id} não foi encontrada.`);
  }

  TODO_LIST.splice(index, 1);

  console.log(`A tarefa com o ID ${id} foi removida da lista.`);

  return true;
}

// Filtra a lista de tarefas.
export function filterItems(filter) {
  if (filter && filter.name) {
    return TODO_LIST.filter((item) =>
      item.name.toLowerCase().includes(filter.name.toLowerCase())
    );
  }
  return TODO_LIST;
}

// Marca ou desmarca tarefa como concluída.
export function toggleComplete(id) {
  const item = TODO_LIST.find((item) => item.id === id);

  if (!item) {
    throw new Error(`A tarefa com o ID ${id} não foi encontrada.`);
  }

  item.completed = !item.completed;

  console.log(
    `O status da tarefa com o ID ${id} foi alterado para: ${item.completed}`
  );

  return true;
}

// Define a prioridade da tarefa.
export function setPriority(id, priority) {
  const item = TODO_LIST.find((item) => item.id === id);

  if (!item) {
    throw new Error(`A tarefa com o ID ${id} não foi encontrada.`);
  }

  item.priority = priority;

  console.log(
    `A prioridade da tarefa com o ID ${id} foi alterada para: ${priority}`
  );

  return true;
}
