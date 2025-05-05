import React, { useState, useRef } from "react";
import { Button, TextField, Menu, MenuItem } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODO_LIST,
  ADD_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../services/queries";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ToDoList from "../components/ToDoList";
import DeleteIcon from "@mui/icons-material/Delete";
import { ALTERAR_CONCLUSAO_MUTATION } from "../services/queries";
import { IconButton } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("low");
  const [filterValue, setFilterValue] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [mostrarAuditoria, setAuditoria] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [deleteMenuAnchor, setDeleteMenuAnchor] = useState(null);
  const inputRef = useRef(null);

  const { data, refetch } = useQuery(GET_TODO_LIST, {
    variables: { filter: { name: filterValue } },
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_TODO_LIST }],
  });

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_TODO_LIST }],
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_TODO_LIST }],
  });

  const [alterarConclusao] = useMutation(ALTERAR_CONCLUSAO_MUTATION, {
    refetchQueries: [{ query: GET_TODO_LIST }],
  });

  const sortedData = React.useMemo(() => {
    if (!data?.todoList) return [];

    const priorityOrder = { high: 1, medium: 2, low: 3 }; // Define a ordem das prioridades.

    switch (sortBy) {
      case "priority":
        return [...data.todoList].sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] // Ordena por alta, média e baixa.
        );
      case "alphabetical":
        return [...data.todoList].sort((a, b) => a.name.localeCompare(b.name));
      case "dateTime":
        return [...data.todoList].sort(
          (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
        );
      default:
        return data.todoList;
    }
  }, [data, sortBy]);

  const handleAddItem = async () => {
    try {
      await addItem({
        variables: {
          name: inputValue,
          priority,
          dateTime: dateTime ? new Date(dateTime).toISOString() : null,
        },
      });
      setInputValue(""); // Limpa o campo de texto.
      setPriority("low"); //Reseta a prioridade para baixa.
      setDateTime(new Date()); // Reseta a data e hora para o padrão.
      inputRef.current.focus(); // Foca novamente no campo de texto.
      setErrorMessage(""); // Limpa mensagens de erro.
      refetch(); // Atualiza a lista depois de uma tarefa adicionada.
    } catch (error) {
      // Exibe a mensagem de erro retornada pelo backend
      setErrorMessage(error.message);
    }
  };

  const handleFilter = () => {
    setErrorMessage("");
    setFilterValue(inputValue);
    refetch({ filter: { name: inputValue } });
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem({ variables: { id } });
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleStartEditing = (id, currentName) => {
    setEditingItem(id);
    setEditingText(currentName);
    setErrorMessage("");
  };

  const handleSaveEditing = async (id, updatedDateTime) => {
    try {
      if (!editingText.trim()) {
        setErrorMessage("O nome da tarefa não pode estar vazio.");
        return;
      }
      await updateItem({
        variables: {
          id,
          name: editingText,
          dateTime: updatedDateTime ? updatedDateTime.toISOString() : null,
        },
      });
      setEditingItem(null);
      setEditingText("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // As funcões abaixo definem o que faz cada tipo de exclusão "geral".
  const handleOpenDeleteMenu = (event) => {
    setDeleteMenuAnchor(event.currentTarget);
  };

  const handleCloseDeleteMenu = () => {
    setDeleteMenuAnchor(null);
  };

  const handleDeleteByPriority = async (priority) => {
    try {
      if (data?.todoList?.length > 0) {
        for (const item of data.todoList) {
          if (item.priority === priority) {
            await deleteItem({ variables: { id: item.id } });
          }
        }
        refetch();
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      handleCloseDeleteMenu();
    }
  };

  const handleDeleteCompleted = async () => {
    try {
      if (data?.todoList?.length > 0) {
        for (const item of data.todoList) {
          if (item.completed) {
            await deleteItem({ variables: { id: item.id } });
          }
        }
        refetch();
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      handleCloseDeleteMenu();
    }
  };

  const handleDeleteAll = async () => {
    try {
      if (data?.todoList?.length > 0) {
        for (const item of data.todoList) {
          await deleteItem({ variables: { id: item.id } });
        }
        refetch();
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      handleCloseDeleteMenu();
    }
  };

  //Marca ou desmarca a tarefa como feita.
  const handleAlterarConclusao = async (id) => {
    try {
      await alterarConclusao({ variables: { id } });
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "rgb(64, 64, 69)",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
        width: "100%",
      }}
    >
      {/* Logo da UNO */}
      <img
        src="https://raw.githubusercontent.com/ZDjow/to-do-List/refs/heads/main/frontend/public/media/uno-logo.png"
        alt="Logo UNO"
        style={{
          width: "100px",
          marginBottom: "10px",
        }}
      />
      <h1 style={{ color: "white", fontSize: "23px", marginBottom: "5px" }}>
        LISTA DE TAREFAS
      </h1>
      <div
        style={{
          backgroundColor: "rgb(200, 200, 200)",
          padding: "10px",
          borderRadius: "5px",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        {/* Campo de texto */}
        <TextField
          label="Adicionar ou procurar tarefas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItem();
            }
          }}
          inputRef={inputRef}
          variant="standard"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        />

        {/* Botões de prioridade */}
        <div
          style={{
            position: "absolute",
            top: "24%",
            right: "10px",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "5px",
          }}
        >
          <IconButton
            onClick={() => setPriority("low")}
            sx={{
              border: "2px solid green",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: priority === "low" ? "green" : "transparent",
            }}
          />
          <IconButton
            onClick={() => setPriority("medium")}
            sx={{
              border: "2px solid yellow",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: priority === "medium" ? "yellow" : "transparent",
            }}
          />
          <IconButton
            onClick={() => setPriority("high")}
            sx={{
              border: "2px solid red",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: priority === "high" ? "red" : "transparent",
            }}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          {/* Campo da data */}
          <DateTimePicker
            label=""
            value={dateTime}
            onChange={(newValue) => {
              if (newValue) {
                setDateTime(newValue);
              }
            }}
            slotProps={{
              textField: {
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddItem();
                  }
                },
                variant: "outlined",
                fullWidth: true,
                InputProps: {
                  sx: {
                    "& .MuiSvgIcon-root": {
                      color: "gray",
                    },
                  },
                },
              },
            }}
            views={["year", "month", "day"]}
            format="dd/MM/yyyy"
          />

          {/* Campo da hora */}
          <TimePicker
            label=""
            value={dateTime}
            onChange={(newValue) => {
              if (newValue) {
                setDateTime(newValue);
              }
            }}
            slotProps={{
              textField: {
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddItem();
                  }
                },
                variant: "outlined",
                fullWidth: true,
                InputProps: {
                  sx: {
                    "& .MuiSvgIcon-root": {
                      color: "gray",
                    },
                  },
                },
              },
            }}
            ampm={false}
            format="HH:mm"
          />
        </div>

        {/* Botões */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              flex: 1,
              marginRight: "10px",
            }}
            onClick={handleAddItem}
          >
            ADD
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              flex: 1,
              marginRight: "10px",
            }}
            onClick={handleFilter}
          >
            Buscar
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "8%",
              minWidth: "40px",
              color: "white",
              backgroundColor: "gray",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
            onClick={() => {
              setInputValue("");
              setErrorMessage("");
              refetch({ filter: { name: "" } });
            }}
          >
            <FilterAltOffIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "8%",
              minWidth: "40px",
              color: "white",
              backgroundColor: "gray",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              marginLeft: "10px",
            }}
            onClick={handleOpenDeleteMenu}
          >
            <DeleteIcon />
          </Button>
          <Menu
            anchorEl={deleteMenuAnchor}
            open={Boolean(deleteMenuAnchor)}
            onClose={handleCloseDeleteMenu}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "rgb(200, 200, 200)",
                color: "rgb(64, 64, 64)",
              },
            }}
          >
            <MenuItem
              onClick={() => handleDeleteByPriority("low")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                },
              }}
            >
              Excluir tarefas de baixa prioridade
            </MenuItem>
            <MenuItem
              onClick={() => handleDeleteByPriority("medium")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                },
              }}
            >
              Excluir tarefas de média prioridade
            </MenuItem>
            <MenuItem
              onClick={() => handleDeleteByPriority("high")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                },
              }}
            >
              Excluir tarefas de alta prioridade
            </MenuItem>
            <MenuItem
              onClick={handleDeleteCompleted}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                },
              }}
            >
              Excluir tarefas completas
            </MenuItem>
            <MenuItem
              onClick={handleDeleteAll}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(150, 150, 150)",
                },
              }}
            >
              Excluir todas as tarefas
            </MenuItem>
          </Menu>
        </div>
      </div>
      <ToDoList
        data={{ todoList: sortedData }}
        onDelete={handleDeleteItem}
        startEditing={handleStartEditing}
        saveEditing={handleSaveEditing}
        editingItem={editingItem}
        editingText={editingText}
        setEditingText={setEditingText}
        setEditingItem={setEditingItem}
        error={errorMessage}
        aoAlterarConclusao={handleAlterarConclusao}
        mostrarAuditoria={mostrarAuditoria}
        setAuditoria={setAuditoria}
        setSortBy={setSortBy}
      />
    </div>
  );
}
