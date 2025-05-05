/**
 * Verifica se o nome está vazio ou contém apenas espaços em branco.
 * @param {string} name - Nome a ser validado.
 * @throws {Error} Se o nome estiver vazio.
 */
function validateNameIsNotEmpty(name) {
  if (!name || name.trim() === "") {
    throw new Error("A tarefa precisa de uma descrição.");
  }
}

/**
 * Verifica se o nome já existe na lista.
 * @param {string} name - Nome a ser validado.
 * @param {Array} list - Lista de itens para verificar duplicidade.
 * @param {number|null} excludeId - ID a ser excluído da verificação (opcional).
 * @throws {Error} Se o nome já existir na lista.
 */
function validateNameIsUnique(name, list, excludeId = null) {
  const nameExists = list.some(
    (item) =>
      item.id !== excludeId &&
      item.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (nameExists) {
    throw new Error(`A tarefa "${name}" já consta na lista.`);
  }
}

module.exports = {
  validateNameIsNotEmpty,
  validateNameIsUnique,
};
