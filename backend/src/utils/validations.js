export function validaDescricaoVazia(name) {
  if (!name || name.trim() === "") {
    throw new Error("A tarefa precisa de uma descrição.");
  }
}

export function validaTarefaDuplicada(name, list, excludeId = null) {
  const nameExists = list.some(
    (item) =>
      item.id !== excludeId &&
      item.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (nameExists) {
    throw new Error(`A tarefa "${name}" já consta na lista.`);
  }
}
