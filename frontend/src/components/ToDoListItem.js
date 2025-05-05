import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function ToDoListItem({
  value,
  isEditing,
  editingText,
  setEditingText,
  editingDateTime,
  setEditingDateTime,
  startEditing,
  saveEditing,
  onDelete,
  onToggleComplete,
  showAudit,
}) {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "5px",
        marginTop: "5px",
        marginBottom: "5px",
        textDecoration: value.completed ? "line-through" : "none",
        color: value.completed ? "gray" : "inherit",
        display: "flex",
        flexDirection: "column", // Alinha os elementos verticalmente
        alignItems: "flex-start", // Alinha os itens à esquerda
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* Botão de alternar conclusão */}
        <IconButton
          onClick={() => onToggleComplete(value.id)}
          sx={{
            border: "2px solid gray",
            borderRadius: "50%",
            width: "13px",
            height: "13px",
            padding: "0px",
            marginRight: "7px",
            backgroundColor: value.completed ? "gray" : "transparent",
            "&:hover": {
              backgroundColor: value.completed ? "darkgray" : "lightgray",
            },
          }}
        />
        {isEditing ? (
          <TextField
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEditing(value.id, editingDateTime); // Passa a data/hora ao salvar
              } else if (e.key === "Escape") {
                startEditing(null); // Cancela a edição
              }
            }}
            autoFocus
            sx={{ marginRight: "10px", flex: 1 }}
          />
        ) : (
          <ListItemText primary={value.name} sx={{ marginRight: "auto" }} />
        )}
        {isEditing ? (
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEditing(value.id, editingText, editingDateTime); // Salva a edição ao pressionar Enter
              } else if (e.key === "Escape") {
                startEditing(null); // Cancela a edição ao pressionar Escape
              }
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <DateTimePicker
              value={editingDateTime}
              onChange={(newValue) => setEditingDateTime(newValue)}
              ampm={false} // Formato 24 horas
              format="dd/MM/yyyy HH:mm" // Formato de exibição
              sx={{ marginRight: "10px", width: "150px" }}
            />
          </div>
        ) : (
          <Typography
            variant="body2"
            sx={{
              marginRight: "10px",
              color: "gray",
              whiteSpace: "nowrap",
            }}
          >
            {new Date(value.dateTime).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {new Date(value.dateTime).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}
        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          <IconButton
            onClick={() => startEditing(value.id, value.name, value.dateTime)}
            sx={{
              color: "gray",
              "&:hover": {
                color: "darkgray",
              },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => onDelete(value.id)}
            sx={{
              color: "gray",
              "&:hover": {
                color: "darkgray",
              },
            }}
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      {showAudit && (
        <div style={{ marginTop: "5px", fontSize: "12px", color: "gray" }}>
          Criado em:{" "}
          {new Date(value.createdAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          {value.updatedAt && (
            <>
              {" | "}Atualizado em:{" "}
              {new Date(value.updatedAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}
        </div>
      )}
    </ListItem>
  );
}
