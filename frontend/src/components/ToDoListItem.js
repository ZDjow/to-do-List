import React from "react";
import { ListItem, ListItemText, IconButton, TextField } from "@mui/material";
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
  showAudit, // Passa a visibilidade da auditoria
}) {
  const now = new Date();
  const taskDateTime = new Date(value.dateTime);
  const isDatePast = taskDateTime.toDateString() < now.toDateString();
  const isTimePast =
    isDatePast || // Se a data já passou, o horário também deve ficar vermelho
    (taskDateTime.toDateString() === now.toDateString() &&
      taskDateTime.getTime() < now.getTime());

  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "5px",
        marginTop: "5px",
        marginBottom: "5px",
        textDecoration: value.completed ? "line-through" : "none", // Aplica o estilo riscado
        color: value.completed ? "gray" : "inherit", // Altera a cor do texto se concluído
        display: "flex", // Alinha os itens horizontalmente
        justifyContent: "space-between", // Espaça o conteúdo
        alignItems: "center", // Centraliza verticalmente
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
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
          <ListItemText
            primary={
              <>
                {value?.name}
                {showAudit && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      marginTop: "5px",
                    }}
                  >
                    {value?.createdAt && (
                      <div>
                        Agendado em{" "}
                        {new Date(value.createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                    {value?.updatedAt && (
                      <div>
                        Alterado em{" "}
                        {new Date(value.updatedAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            }
            sx={{ marginRight: "auto" }} // Garante que o texto ocupe o espaço restante
          />
        )}
      </div>

      {/* Data e Hora */}
      <div
        style={{
          textAlign: "right",
          minWidth: "150px",
          marginLeft: "auto", // Adiciona margem automática para empurrar o conteúdo à direita
        }}
      >
        {value?.dateTime && !isNaN(new Date(value.dateTime).getTime()) ? (
          <span>
            <span
              style={{
                color: isDatePast ? "red" : "inherit", // Vermelho se a data já passou
              }}
            >
              {new Date(value.dateTime).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>{" "}
            <span
              style={{
                color: isTimePast ? "red" : "inherit", // Vermelho se o horário já passou
              }}
            >
              {new Date(value.dateTime).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        ) : (
          <span>Data inválida</span>
        )}
      </div>

      <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
        <IconButton
          onClick={() => startEditing(value.id, value.name)}
          sx={{
            color: "gray", // Define a cor cinza
            "&:hover": {
              color: "darkgray", // Cor ao passar o mouse
            },
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => onDelete(value.id)}
          sx={{
            color: "gray", // Define a cor cinza
            "&:hover": {
              color: "darkgray", // Cor ao passar o mouse
            },
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </ListItem>
  );
}
