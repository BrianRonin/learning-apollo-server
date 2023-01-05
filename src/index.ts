import { ApolloServer } from '@apollo/server'
import { resolvers } from './graphql/resolvers'
import { schema as _schema_ } from './graphql/schema'
import { context } from './graphql/context/context'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { datasource_post } from './graphql/schemas/post/D.post'
import { datasource_user } from './graphql/schemas/user/D.user'
import { datasource_comment } from './graphql/schemas/comment/D.comment'
import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer as useWSGraphqlServer } from 'graphql-ws/lib/use/ws'
import { wsContext } from './graphql/context/ws-context'

const app = express()
const httpServer = http.createServer(app)
const schema = makeExecutableSchema({
  typeDefs: _schema_,
  resolvers,
})

export interface Context {
  db: {
    ds_post: datasource_post
    ds_user: datasource_user
    ds_comment: datasource_comment
  }
}
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
})

const serverWSGraphqlCleanup = useWSGraphqlServer(
  { schema, context: wsContext },
  wsServer,
)

export const server = new ApolloServer<Context>({
  schema,
  persistedQueries: {
    ttl: 60,
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverWSGraphqlCleanup.dispose()
          },
        }
      },
    },
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
