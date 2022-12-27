import { ApolloServer } from '@apollo/server'
import { datasource_comment } from './graphql/comment/D.comment'
import { datasource_post } from './graphql/post/D.post'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import { datasource_user } from './graphql/user/D.user'
import { context } from './graphql/context'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const httpServer = http.createServer(app)

export interface Context {
  db: {
    ds_post: datasource_post
    ds_user: datasource_user
    ds_comment: datasource_comment
  }
}

const server = new ApolloServer<Context>({
  typeDefs: schema,
  resolvers: resolvers,
  persistedQueries: {
    ttl: 60,
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
  ],
})

const start = async () => {
  await server.start()

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: 'http://localhost',
      optionsSuccessStatus: 200,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context,
    }),
  )

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(
    `🚀 Server ready at http://localhost:4000/`,
  )
}
start()
