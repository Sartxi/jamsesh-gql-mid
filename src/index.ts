import "reflect-metadata";
import express from "express";
import { createServer } from 'http';
import { createConnection } from "typeorm";
import { ApolloServer, PubSub } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { GroupResolver } from "./resolvers/GroupResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();
  const pubsub = new PubSub();
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GroupResolver, UserResolver]
    }),
    context: ({ req, res }) => ({ req, pubsub, res }),
  });

  const httpServer = createServer(app);
  const corsOptions = { origin: 'http://localhost:3333', credentials: true };
  apolloServer.applyMiddleware({ app, cors: corsOptions });
  apolloServer.installSubscriptionHandlers(httpServer);

  try {
    httpServer.listen(4000);
    console.log(`server ==> Look alive boys`);
  } catch (error) {
    console.log('Apollo server error');
    throw new Error(error);
  }
})();
