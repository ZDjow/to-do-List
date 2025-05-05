import React from "react";
import { List, IconButton, Typography } from "@mui/material"; // Importando Button
import ToDoListItem from "./ToDoListItem";
import html2canvas from "html2canvas"; // Importa a biblioteca para capturar a tela
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SortIcon from "@mui/icons-material/Sort"; // Ícone para prioridade (linhas empilhadas)
import TimelapseIcon from "@mui/icons-material/Timelapse"; // Ícone para horas
import ShareIcon from "@mui/icons-material/Share"; // Importa o ícone de compartilhamento
import DownloadIcon from "@mui/icons-material/Download"; // Ícone para download
import DescriptionIcon from "@mui/icons-material/Description"; // Ícone de folha com riscos

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
    setEditingDateTime(currentDateTime ? new Date(currentDateTime) : null); // Converte para objeto Date
  };

  const handleShare = async () => {
    // Seleciona apenas o elemento da lista de tarefas
    const listElement = document.querySelector(".todo-list-items"); // Use uma classe ou id específico
    if (!listElement) return;

    try {
      const canvas = await html2canvas(listElement);
      const image = canvas.toDataURL("image/png");

      // Compartilhar a imagem usando a API Web Share (se suportada)
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
        // Caso o navegador não suporte, abre a imagem em uma nova aba
        const link = document.createElement("a");
        link.href = image;
        link.download = "todo-list.png";
        link.click();
      }
    } catch (error) {
      console.error("Erro ao compartilhar a lista:", error);
    }
  };

  const handleDownloadImage = async () => {
    const listElement = document.querySelector(".todo-list-items");
    if (!listElement) return;

    try {
      const canvas = await html2canvas(listElement);
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "todo-list.png";
      link.click();
    } catch (error) {
      console.error("Erro ao baixar a lista como imagem:", error);
    }
  };

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
        translatePriority(item.priority), // Traduz a prioridade
        formatDateTime(item.dateTime), // Formata a data e hora
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    }); // Adiciona BOM para UTF-8
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

      await saveEditing(id, editingDateTime); // Passa a data/hora atualizada
      setEditingItem(null);
      setEditingText("");
      setEditingDateTime(null);
    } catch (error) {
      console.error("Erro ao salvar a edição:", error);
    }
  };

  return (
    <div
      id="todo-list-container" // Adiciona um ID para capturar a lista
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
              color: "rgb(64, 64, 64)",
            },
          }}
        >
          {showAudit ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>

      <List
        className="todo-list-items" // Adiciona uma classe para capturar a lista
        sx={{
          width: "100%",
          color: "rgb(64, 64, 69)",
          position: "relative", // Permite posicionar o botão dentro da lista
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
                saveEditing={handleSaveEditing} // Passa a função corrigida
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
          gap: "10px", // Espaçamento entre os botões
        }}
      >
        <IconButton
          onClick={handleExportCSV} // Botão de exportar CSV agora vem primeiro
          sx={{
            color: "gray",
            "&:hover": {
              color: "darkgray",
            },
          }}
        >
          <DescriptionIcon /> {/* Ícone de folha com riscos */}
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
          onClick={handleShare} // Botão de compartilhar agora vem por último
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
