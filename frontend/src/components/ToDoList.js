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
}) {
  return (
    <div>
      <ErrorMessage error={error} />
      <List sx={{ width: "100%" }}>
        {data?.todoList?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "15px",
              color: "rgb(64, 64, 69)",
            }}
          >
            Nenhum registro encontrado.
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
              />
            );
          })
        )}
      </List>
    </div>
  );
}
