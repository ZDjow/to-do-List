import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient"; // Importa o Apollo Client configurado
import Home from "./pages/Home"; // Página principal
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <div className="background-container"></div>
          <header className="App-header">
            <Home />
          </header>
        </div>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
