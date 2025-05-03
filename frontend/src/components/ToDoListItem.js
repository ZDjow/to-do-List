import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ToDoListItem({
  value,
  isEditing,
  editingText,
  setEditingText,
  startEditing,
  saveEditing,
  onDelete,
  onToggleComplete, // Função para alternar o status
}) {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "5px",
        marginTop: "5px",
        marginBottom: "5px",
        textDecoration: value.completed ? "line-through" : "none", // Aplica o estilo riscado
        color: value.completed ? "gray" : "inherit", // Altera a cor do texto se concluído
      }}
    >
      <ListItemButton dense>
        <IconButton
          sx={{
            width: "13px",
            height: "13px",
            padding: "0px",
            marginRight: "7px",
            backgroundColor:
              value.priority === "low"
                ? "green"
                : value.priority === "medium"
                ? "yellow"
                : "red", // Define a cor de fundo com base na prioridade
          }}
        />
        {/* Botão de alternar conclusão */}
        <IconButton
          onClick={() => onToggleComplete(value.id)}
          sx={{
            border: "2px solid gray", // Borda da bolinha
            borderRadius: "50%", // Forma circular
            width: "13px",
            height: "13px",
            padding: "0px",
            marginRight: "7px",
            backgroundColor: value.completed ? "gray" : "transparent", // Fundo preenchido se concluído
            "&:hover": {
              backgroundColor: value.completed ? "darkgray" : "lightgray", // Efeito hover
            },
          }}
        />
        {isEditing ? (
          <TextField
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onBlur={() => saveEditing(value.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEditing(value.id);
                e.target.blur();
              } else if (e.key === "Escape") {
                e.target.blur();
              }
            }}
            autoFocus
          />
        ) : (
          <ListItemText primary={value?.name} />
        )}

        <IconButton onClick={() => startEditing(value.id, value.name)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(value.id)}>
          <Delete />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
