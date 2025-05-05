import React from "react";
import { List, IconButton, Typography } from "@mui/material";
import ToDoListItem from "./ToDoListItem";
import html2canvas from "html2canvas";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SortIcon from "@mui/icons-material/Sort";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";

// Subcomponente para exibir as mensagens de erro.
function ErrorMessage({ error }) {
  return error ? <p style={{ color: "red" }}>{error}</p> : null;
}

// Componente principal da lista de tarefas
export default function ToDoList({
  data,
  onDelete,
  saveEditing,
  editingItem,
  editingText,
  setEditingText,
  setEditingItem,
  error,
  onToggleComplete,
  showAudit,
  setShowAudit,
  setSortBy,
}) {
  const [editingDateTime, setEditingDateTime] = React.useState(null);

  const handleStartEditing = (id, currentName, currentDateTime) => {
    setEditingItem(id);
    setEditingText(currentName);
    setEditingDateTime(currentDateTime ? new Date(currentDateTime) : null);
  };

  //Compartilha a lista de tarefas.
  const handleShare = async () => {
    const listElement = document.querySelector(".todo-list-items");
    if (!listElement) return;

    // Oculta os botões de prioridade, edição e exclusão da tarefa antes de capturar a imagem para compartilhar.
    const buttons = listElement.querySelectorAll("button, .MuiIconButton-root");
    buttons.forEach((button) => (button.style.display = "none"));

    try {
      const canvas = await html2canvas(listElement);
      const image = canvas.toDataURL("image/png");

      if (navigator.share) {
        await navigator.share({
          title: "Minha To-Do List",
          text: "Confira minha lista de tarefas!",
          files: [
            new File([await (await fetch(image)).blob()], "todo-list.png", {
              type: "image/png",
            }),
          ],
        });
      } else {
        const link = document.createElement("a");
        link.href = image;
        link.download = "todo-list.png";
        link.click();
      }
    } catch (error) {
      console.error("Erro ao compartilhar a lista:", error);
    } finally {
      buttons.forEach((button) => (button.style.display = "")); // Restaura a visibilidade dos botões.
    }
  };

  // Baixa a lista de tarefas como imagem.
  const handleDownloadImage = async () => {
    const listElement = document.querySelector(".todo-list-items");
    if (!listElement) return;

    // Oculta os botões antes de capturar a imagem para baixar.
    const buttons = listElement.querySelectorAll("button, .MuiIconButton-root");
    buttons.forEach((button) => (button.style.display = "none"));

    try {
      const canvas = await html2canvas(listElement);
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "todo-list.png";
      link.click();
    } catch (error) {
      console.error("Erro ao baixar a lista como imagem:", error);
    } finally {
      buttons.forEach((button) => (button.style.display = "")); // Restaura a visibilidade dos botões.
    }
  };

  // Exporta a lista de tarefas como CSV.
  const handleExportCSV = () => {
    if (!data?.todoList?.length) return;

    const translatePriority = (priority) => {
      switch (priority) {
        case "low":
          return "Baixa";
        case "medium":
          return "Média";
        case "high":
          return "Alta";
        default:
          return priority;
      }
    };

    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const csvContent = [
      ["ID", "Nome", "Concluído", "Prioridade", "Data e Hora"],
      ...data.todoList.map((item) => [
        item.id,
        item.name,
        item.completed ? "Sim" : "Não",
        translatePriority(item.priority), // Traduz a prioridade para português.
        formatDateTime(item.dateTime), // Formata a data e hora para simplificar a planilha.
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;", //Formata os caracteres para UTF-8.
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "todo-list.csv";
    link.click();
  };

  const handleSaveEditing = async (id) => {
    try {
      if (!editingText.trim()) {
        console.error("O nome da tarefa não pode estar vazio.");
        return;
      }

      await saveEditing(id, editingDateTime); // Passa a data e hora atualizadas.
      setEditingItem(null);
      setEditingText("");
      setEditingDateTime(null);
    } catch (error) {
      console.error("Erro ao salvar a edição:", error);
    }
  };

  return (
    <div
      id="todo-list-container"
      style={{
        backgroundColor: "rgb(200, 200, 200)",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px",
        position: "relative",
      }}
    >
      <ErrorMessage error={error} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Botões de ordenação */}
        <div style={{ display: "flex", gap: "10px" }}>
          <IconButton
            onClick={() => setSortBy("priority")}
            style={{
              color: "gray",
            }}
          >
            <SortIcon />
          </IconButton>
          <IconButton
            onClick={() => setSortBy("alphabetical")}
            style={{
              color: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          >
            <Typography
              variant="h6"
              component="span"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              A
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => setSortBy("dateTime")}
            style={{ color: "gray" }}
          >
            <TimelapseIcon />
          </IconButton>
        </div>

        {/* Botão de mostrar auditoria */}
        <IconButton
          onClick={() => setShowAudit(!showAudit)}
          sx={{
            color: "rgb(125, 125, 125)",
            "&:hover": {
              color: "rgb(64, 64, 64)",
            },
          }}
        >
          {showAudit ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>

      <List
        className="todo-list-items"
        sx={{
          width: "100%",
          color: "rgb(64, 64, 69)",
          position: "relative",
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
                editingDateTime={editingDateTime}
                setEditingDateTime={setEditingDateTime}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                showAudit={showAudit}
                startEditing={handleStartEditing}
                saveEditing={handleSaveEditing}
              />
            );
          })
        )}
      </List>

      {/* Botões de compartilhamento, download e exportação */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <IconButton
          onClick={handleExportCSV}
          sx={{
            color: "gray",
            "&:hover": {
              color: "darkgray",
            },
          }}
        >
          <DescriptionIcon />
        </IconButton>
        <IconButton
          onClick={handleDownloadImage}
          sx={{
            color: "gray",
            "&:hover": {
              color: "darkgray",
            },
          }}
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          onClick={handleShare}
          sx={{
            color: "gray",
            "&:hover": {
              color: "darkgray",
            },
          }}
        >
          <ShareIcon />
        </IconButton>
      </div>
    </div>
  );
}
