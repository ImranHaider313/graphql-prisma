import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  context: {
    db,
    pubsub
  },
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
    Subscription
  }
});

server.start((detail) => {
  console.log(`The server is up at ${detail.port}`);
})