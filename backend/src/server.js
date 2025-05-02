const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./graphql/schemas/toDoListSchema");
const resolvers = require("./graphql/resolvers/toDoListResolver");
const CONFIG = require("./config/config");

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
