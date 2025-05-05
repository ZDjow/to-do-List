import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query todoList($filter: ItemFilter) {
    todoList(filter: $filter) {
      id
      name
      completed
      priority
      dateTime
      createdAt
      updatedAt
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($name: String!, $priority: String!, $dateTime: String!) {
    addItem(values: { name: $name, priority: $priority, dateTime: $dateTime })
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($id: Int!, $name: String!, $dateTime: String) {
    updateItem(values: { id: $id, name: $name, dateTime: $dateTime })
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;

export const ALTERAR_CONCLUSAO_MUTATION = gql`
  mutation alterarConclusao($id: Int!) {
    alterarConclusao(id: $id)
  }
`;

export const SET_PRIORITY_MUTATION = gql`
  mutation setPriority($id: Int!, $priority: String!) {
    setPriority(id: $id, priority: $priority)
  }
`;
