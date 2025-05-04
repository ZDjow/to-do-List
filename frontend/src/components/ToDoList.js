import React from "react";
import { List, IconButton, Typography } from "@mui/material"; // Importando Typography
import ToDoListItem from "./ToDoListItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SortIcon from "@mui/icons-material/Sort"; // Ícone para prioridade (linhas empilhadas)
import TimelapseIcon from "@mui/icons-material/Timelapse"; // Ícone para horas

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
  onToggleComplete,
  showAudit,
  setShowAudit,
  setSortBy,
}) {
  return (
    <div
      style={{
        backgroundColor: "rgb(200, 200, 200)",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px",
        position: "relative",
      }}
    >
      <ErrorMessage error={error} />

      {/* Botões de filtro */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <IconButton
            onClick={() => setSortBy("priority")}
            style={{
              color: "gray", // Cor padrão do ícone
            }}
          >
            <SortIcon /> {/* Ícone para prioridade */}
          </IconButton>
          <IconButton
            onClick={() => setSortBy("alphabetical")}
            style={{
              color: "gray", // Cor do texto
              display: "flex", // Centraliza o conteúdo
              alignItems: "center", // Centraliza verticalmente
              justifyContent: "center", // Centraliza horizontalmente
              borderRadius: "50%", // Garante que o botão seja circular
              width: "40px", // Define largura consistente
              height: "40px", // Define altura consistente
            }}
          >
            <Typography
              variant="h6"
              component="span"
              style={{
                fontSize: "18px", // Ajusta o tamanho do texto
                fontWeight: "bold", // Deixa o "A" mais destacado
              }}
            >
              A
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => setSortBy("dateTime")}
            style={{ color: "gray" }}
          >
            <TimelapseIcon /> {/* Ícone para horas */}
          </IconButton>
        </div>

        {/* Botão de alternar visibilidade */}
        <IconButton
          onClick={() => setShowAudit(!showAudit)}
          sx={{
            color: "rgb(125, 125, 125)",
            "&:hover": {
              color: "rgb(64, 64, 69)",
            },
          }}
        >
          {showAudit ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>

      <List
        sx={{
          width: "100%",
          color: "rgb(64, 64, 69)",
        }}
      >
        {data?.todoList?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "15px",
              color: "rgb(64, 64, 69)",
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
                onToggleComplete={onToggleComplete}
                showAudit={showAudit}
              />
            );
          })
        )}
      </List>
    </div>
  );
}
