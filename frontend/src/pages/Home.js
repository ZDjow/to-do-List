import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODO_LIST,
  ADD_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../services/queries";
import ToDoList from "../components/ToDoList";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, refetch } = useQuery(GET_TODO_LIST, {
    variables: { filter: { name: inputValue } },
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

  const handleAddItem = async () => {
    try {
      if (!inputValue.trim()) {
        setErrorMessage("O nome da tarefa não pode estar vazio.");
        return;
      }
      await addItem({ variables: { name: inputValue } });
      setInputValue("");
      setErrorMessage("");
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFilter = () => {
    setErrorMessage("");
    refetch({ filter: { name: inputValue } });
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem({ variables: { id } });
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

  return (
    <div style={{ padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <h1 style={{ color: "white" }}>Lista de tarefas</h1>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Adicionar ou Filtrar tarefas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            marginRight: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
        <Button
          variant="contained"
          style={{
            marginRight: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
          onClick={handleAddItem}
        >
          Adicionar
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2196F3",
            color: "white",
          }}
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ToDoList
        data={data}
        onDelete={handleDeleteItem}
        startEditing={handleStartEditing}
        saveEditing={handleSaveEditing}
        editingItem={editingItem}
        editingText={editingText}
        setEditingText={setEditingText}
        error={errorMessage}
      />
    </div>
  );
}
