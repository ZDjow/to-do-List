import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schemas/toDoListSchema.js";
import resolvers from "./graphql/resolvers/toDoListResolver.js";
import CONFIG from "./config/config.js";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: CONFIG.SERVER_PORT },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

startServer();
