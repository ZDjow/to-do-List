import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODO_LIST,
  ADD_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../services/queries";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ToDoList from "../components/ToDoList";
import DeleteIcon from "@mui/icons-material/Delete"; // Importa o ícone de exclusão
import { TOGGLE_COMPLETE_MUTATION } from "../services/queries"; // Importa a nova mutação
import { IconButton } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers"; // Certifique-se de instalar o pacote @mui/x-date-pickers
import { TimePicker } from "@mui/x-date-pickers"; // Importa o TimePicker

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("low"); // Estado para a prioridade
  const [filterValue, setFilterValue] = useState(""); // Novo estado para o filtro
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dateTime, setDateTime] = useState(new Date()); // Estado para data e hora
  const [showAudit, setShowAudit] = useState(true); // Estado para visibilidade da auditoria

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

  const [toggleComplete] = useMutation(TOGGLE_COMPLETE_MUTATION, {
    refetchQueries: [{ query: GET_TODO_LIST }],
  });

  const handleAddItem = async () => {
    try {
      if (!inputValue.trim()) {
        setErrorMessage("O nome da tarefa não pode estar vazio.");
        return;
      }
      await addItem({
        variables: {
          name: inputValue,
          priority,
          dateTime: dateTime ? new Date(dateTime).toISOString() : null, // Envia no formato ISO
        },
      });
      setInputValue("");
      setPriority("low");
      setDateTime(new Date()); // Reseta a data e hora para o padrão
      setErrorMessage("");
      refetch();
    } catch (error) {
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
      refetch(); // Atualiza a lista de tarefas após excluir
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleStartEditing = (id, currentName) => {
    setEditingItem(id);
    setEditingText(currentName);
    setErrorMessage("");
  };

  const handleSaveEditing = async (id) => {
    try {
      if (!editingText.trim()) {
        setErrorMessage("O nome da tarefa não pode estar vazio.");
        return;
      }
      await updateItem({ variables: { id, name: editingText } });
      setEditingItem(null);
      setEditingText("");
      setErrorMessage("");
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Percorre todas as tarefas e exclui uma por uma
      if (data?.todoList?.length > 0) {
        for (const item of data.todoList) {
          await deleteItem({ variables: { id: item.id } });
        }
        refetch(); // Atualiza a lista após excluir todas
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleComplete({ variables: { id } });
      refetch(); // Atualiza a lista após alternar o status
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
        src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/uno-logo.png" // Caminho para a logo
        alt="Logo UNO"
        style={{
          width: "100px", // Ajuste o tamanho da logo
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
          position: "relative", // Permite posicionar os botões dentro do campo
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
              handleAddItem(); // Salva o item ao pressionar Enter
            }
          }}
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
            top: "24%", // Centraliza verticalmente em relação ao campo de texto
            right: "10px", // Posiciona os botões no canto direito
            transform: "translateY(-50%)", // Ajusta o alinhamento vertical
            display: "flex",
            gap: "5px", // Espaçamento entre os botões
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
            display: "flex", // Alinha os componentes lado a lado
            gap: "10px", // Espaçamento entre os componentes
          }}
        >
          {/* Seletor de Data */}
          <DateTimePicker
            label=""
            value={dateTime}
            onChange={(newValue) => {
              if (newValue) {
                setDateTime(newValue); // Atualize diretamente com o objeto Date
              }
            }}
            views={["year", "month", "day"]} // Mostra apenas a seleção de data
            format="dd/MM/yyyy" // Define o formato da data como DD/MM/YYYY
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
              },
            }}
          />

          {/* Seletor de Hora */}
          <TimePicker
            label=""
            value={dateTime}
            onChange={(newValue) => {
              if (newValue) {
                setDateTime(newValue); // Atualize diretamente com o objeto Date
              }
            }}
            ampm={false} // Desativa o formato AM/PM e usa o formato de 24 horas
            format="HH:mm" // Define o formato da hora como 24 horas
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
              },
            }}
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
              backgroundColor: "rgb(125, 125, 125)",
              "&:hover": {
                backgroundColor: "rgb(64, 64, 69)",
              },
            }}
            color="grey"
            onClick={() => {
              setInputValue(""); // Limpa o campo de texto
              setErrorMessage(""); // Limpa mensagens de erro
              refetch({ filter: { name: "" } }); // Reseta o filtro
            }}
          >
            <FilterAltOffIcon /> {/* Ícone do botão */}
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "8%", // Mesmo tamanho do botão de "Limpar Filtro"
              minWidth: "40px",
              color: "white",
              backgroundColor: "rgb(125, 125, 125)", // Mesma cor do botão de "Limpar Filtro"
              "&:hover": {
                backgroundColor: "rgb(64, 64, 69)", // Mesma cor ao passar o mouse
              },
              marginLeft: "10px", // Espaçamento entre os botões
            }}
            onClick={handleDeleteAll} // Chama a função para excluir todas as tarefas
          >
            <DeleteIcon /> {/* Ícone de exclusão */}
          </Button>
        </div>
      </div>
      <ToDoList
        data={data}
        onDelete={handleDeleteItem}
        startEditing={handleStartEditing}
        saveEditing={handleSaveEditing}
        editingItem={editingItem}
        editingText={editingText}
        setEditingText={setEditingText}
        error={errorMessage}
        onToggleComplete={handleToggleComplete} // Passa a função para alternar o status
        showAudit={showAudit} // Passa o estado de visibilidade
        setShowAudit={setShowAudit} // Passa a função para alternar visibilidade
      />
    </div>
  );
}
