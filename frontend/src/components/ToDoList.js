import React from "react";
import { List, IconButton } from "@mui/material";
import ToDoListItem from "./ToDoListItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  showAudit,
  setShowAudit,
}) {
  return (
    <div
      style={{
        backgroundColor: "rgb(200, 200, 200)", // Fundo claro
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px", // Espaço entre a lista e o formulário
        position: "relative", // Permite posicionar o botão no layout
      }}
    >
      <ErrorMessage error={error} />

      {/* Botão de alternar visibilidade */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // Alinha o botão à direita
          marginBottom: "10px", // Espaço entre o botão e as tarefas
        }}
      >
        <IconButton
          onClick={() => setShowAudit(!showAudit)}
          sx={{
            position: "absolute",
            top: "5px", // Ajusta a posição vertical
            right: "11px", // Ajusta a posição horizontal
            color: "rgb(125, 125, 125)", // Cor cinza semelhante aos outros botões
            zIndex: 1, // Garante que o botão fique acima de outros elementos
            "&:hover": {
              color: "rgb(64, 64, 69)", // Cor mais escura ao passar o mouse
            },
          }}
        >
          {showAudit ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>

      <List
        sx={{
          width: "100%",
          color: "rgb(64, 64, 69)", // Texto cinza escuro
          position: "relative", // Permite posicionar o botão dentro da lista
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
                showAudit={showAudit}
                setShowAudit={setShowAudit} // Passa a visibilidade da auditoria para o item
              />
            );
          })
        )}
      </List>
    </div>
  );
}
