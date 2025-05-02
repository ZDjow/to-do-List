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
}) {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
    >
      <ListItemButton dense>
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
