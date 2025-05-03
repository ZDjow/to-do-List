import React from "react";
import { List } from "@mui/material";
import ToDoListItem from "./ToDoListItem";

// Subcomponente para exibir mensagens de erro
function ErrorMessage({ error }) {
  return error ? <p style={{ color: "red" }}>{error}</p> : null;
}

// Componente principal da lista de tarefas
export default function ToDoList({
  data,
  onDelete,
  startEditing,
  saveEditing,
  editingItem,
  editingText,
  setEditingText,
  error,
  onToggleComplete, // Adicione esta linha para receber a prop
}) {
  return (
    <div
      style={{
        backgroundColor: "rgb(200, 200, 200)", // Fundo claro
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px", // Espaço entre a lista e o formulário
      }}
    >
      <ErrorMessage error={error} />
      <List
        sx={{
          width: "100%",
          color: "rgb(64, 64, 69)", // Texto cinza escuro
        }}
      >
        {data?.todoList?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "15px",
              color: "rgb(64, 64, 69)", // Texto cinza escuro
            }}
          >
            Sem tarefas no momento.
          </div>
        ) : (
          data?.todoList?.map((value) => {
            const isEditing = editingItem === value.id;

            return (
              <ToDoListItem
                key={value.id}
                value={value}
                isEditing={isEditing}
                editingText={editingText}
                setEditingText={setEditingText}
                startEditing={startEditing}
                saveEditing={saveEditing}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete} // Passa a função para alternar o status
              />
            );
          })
        )}
      </List>
    </div>
  );
}
