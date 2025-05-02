import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Configuração do link HTTP para o backend GraphQL
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI, // URL do backend GraphQL
});

// Configuração do link de autenticação (se necessário)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// Instância do Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
