import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient"; // Importa o Apollo Client configurado
import Home from "./pages/Home"; // Página principal

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
