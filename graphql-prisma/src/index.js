import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  resolvers,
  fragmentReplacements
});

server.start((detail) => {
  console.log(`The server is up at ${detail.port}`);
})
