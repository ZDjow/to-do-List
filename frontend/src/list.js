import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, TextField, IconButton } from "@mui/material";
import { styled } from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_ITEM_MUTATION,
  GET_TODO_LIST,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "./queries";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"; //Ícone do botão de recarregar.

//before para conseguir trabalhar com o contraste de cores e imagem de fundo.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding: 20px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://cdn.getmidnight.com/a4bab3ce420ea5342f99b468206738eb/2024/05/Design-de-uma-Clinica-Estetica-de-Luxo.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: grayscale(100%);
    z-index: -1;
  }
`;

const ContainerTop = styled.form`
  display: flex;
  background-color: rgb(200, 200, 200);
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`;

const ContainerList = styled.div`
  display: flex;
  width: 600px;
  background-color: rgb(64, 64, 69);
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`;

const ContainerListItem = styled.div`
  background-color: rgb(200, 200, 200);
  color: rgb(64, 64, 69);
  padding: 10px;
  border-radius: 5px;
  max-height: 400px;
  overflow: auto;
  font-color: white;
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: white;
`;

export default function CheckboxList() {
  const [item, setItem] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, refetch } = useQuery(GET_TODO_LIST, {
    variables: { filter: { name: filter } },
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    refetchQueries: [
      { query: GET_TODO_LIST, variables: { filter: { name: filter } } },
    ],
  });

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    refetchQueries: [
      { query: GET_TODO_LIST, variables: { filter: { name: filter } } },
    ],
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [
      { query: GET_TODO_LIST, variables: { filter: { name: filter } } },
    ],
  });

  /*
    Observações:
    Foi usado "try catch" nas três rotinas principais (inserção, edição e exclusão) por motivos de segurança e 
    para exibir as mensagens de erro do backend.
    Os "setEditing", "setError" e "blur" vazios ou nulos são limpezas de campos, erros e mudanças de foco.
  */

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await addItem({
        variables: {
          name: item,
        },
      });

      setItem("");
      setFilter("");
      setErrorMessage("");
      refetch({ filter: { name: "" } }); //Adicionadas limpezas na rotina de inserção pré-existente.
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Erro ao adicionar o item:", error);
    }
  };

  const onDelete = async (id) => {
    //Deleta pelo id.
    try {
      await deleteItem({
        variables: { id },
      });
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Erro ao excluir o item:", error);
    }
  };

  const startEditing = (id, currentName) => {
    //Inicia a edição do item setando foco e armazenando nome e id.
    setEditingItem(id);
    setEditingText(currentName);
    setErrorMessage("");
  };

  const saveEditing = async (id) => {
    //Edita pelo id.
    try {
      await updateItem({
        variables: {
          id: id,
          name: editingText,
        },
      });

      setEditingItem(null);
      setEditingText("");
      setErrorMessage("");
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Erro ao editar o item:", error);

      setEditingItem(null);
      setEditingText("");
    }
  };

  const handleFilter = () => {
    //Aplica o filtro por nome na lista.
    setErrorMessage("");
    setFilter(item);
    refetch({ filter: { name: item } });
  };

  return (
    <Container>
      <ContainerList>
        <img
          src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/uno-logo.png"
          alt="Logotipo1"
          style={{
            width: "150px",
            height: "auto",
            display: "block",
            margin: "0 auto 10px",
          }}
        />
        <Title>LISTA DE CLÍNICAS</Title>
        <ContainerTop onSubmit={onSubmit}>
          <TextField
            id="item"
            label="Digite aqui"
            value={item}
            type="text"
            variant="standard"
            onChange={(e) => setItem(e.target.value)}
          />
          {errorMessage && ( //Mensagens de erro que vem do backend escritas em vermelho para terem atenção e colocadas logo a baixo do botão salvar.
            <div
              style={{
                color: "red",
                marginTop: "5px",
                fontSize: "20px",
              }}
            >
              {errorMessage}
            </div>
          )}
          <ContainerButton>
            <Button //Botão de recarregar filtro que pode funcionar como um zerador, limpa mensagens de erro, tira o foco, etc.
              variant="contained"
              sx={{
                width: "10%",
                minWidth: "40px",
                color: "white",
                backgroundColor: "rgb(125, 125, 125)",
                "&:hover": {
                  backgroundColor: "rgb(64, 64, 69)",
                },
              }}
              color="grey"
              onClick={() => {
                setItem("");
                setErrorMessage("");

                setFilter("");
                refetch({ filter: { name: "" } });
              }}
            >
              <FilterAltOffIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              color="info"
              onClick={handleFilter}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              color="success"
              type="submit"
            >
              Salvar
            </Button>
          </ContainerButton>
        </ContainerTop>
        <List sx={{ width: "100%" }}>
          <ContainerListItem>
            {data?.todoList?.length === 0 ? ( //Mensagem padrão caso o filtro não encontre itens na lista ou todos os itens sejam excluídos.
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "rgb(64, 64, 69)",
                }}
              >
                Nenhuma registro encontado.
              </div>
            ) : (
              data?.todoList?.map((value, index) => {
                const isEditing = editingItem === value.id;

                return (
                  <ListItem
                    key={index}
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
                          onBlur={() => {
                            setEditingItem(null);
                            setEditingText("");
                          }}
                          onKeyDown={(e) => {
                            //Troquei o keypress por que ele foi preterido nas versões mais recentes do NodeJs.
                            if (e.key === "Enter") {
                              saveEditing(value.id);
                              e.target.blur();
                            } else if (e.key === "Escape") {
                              //Se clicar "Esc" sai da edição sem fazer nada.
                              e.target.blur();
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <ListItemText primary={value?.name} />
                      )}

                      <IconButton
                        onClick={() => startEditing(value.id, value.name)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => onDelete(value.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                );
              })
            )}
          </ContainerListItem>
        </List>

        {/* Usei o repositório público como "servidor" para as imagens */}

        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <p style={{ fontSize: "14px", color: "white" }}>
            Franqueadoras que confiam em nossas soluções:
          </p>
          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/chef-gourmet-logo.png"
            alt="Logotipo1"
            style={{ maxWidth: "100px", height: "auto" }}
          />

          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/uniodonto-logo.png"
            alt="Logotipo2"
            style={{ maxWidth: "100px", height: "auto" }}
          />

          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/show-escovas-logo.png"
            alt="Logotipo1"
            style={{ maxWidth: "100px", height: "auto" }}
          />

          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/jumper-logo.png"
            alt="Logotipo2"
            style={{ maxWidth: "100px", height: "auto" }}
          />

          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/espacolaser-logo.png"
            alt="Logotipo1"
            style={{ maxWidth: "100px", height: "auto" }}
          />

          <img
            src="https://raw.githubusercontent.com/ZDjow/Uno-Solucoes/refs/heads/master/frontend/public/magrass-logo.png"
            alt="Logotipo1"
            style={{ maxWidth: "100px", height: "auto" }}
          />
        </div>
      </ContainerList>
    </Container>
  );
}
