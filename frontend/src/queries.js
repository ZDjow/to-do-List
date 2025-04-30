import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query todoList($filter: ItemFilter) {
    #Adicionado parâmetro para filtro opcional no retorno da consulta.
    todoList(filter: $filter) {
      id
      name
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($name: String!) {
    #Simplificado com o name, até para se ter um padrão.
    addItem(values: { name: $name })
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($id: Int!, $name: String!) {
    updateItem(values: { id: $id, name: $name })
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;
