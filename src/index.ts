// * Imports: Base
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

// * Imports: Apollo-server ⚜

import { expressMiddleware } from '@apollo/server/express4'
import {
  ApolloContext,
  context,
} from './graphql/context/context'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { apolloSchema } from './graphql/schema/schema'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { wsContext } from './graphql/context/ws-context'

const app = express()
const httpServer = http.createServer(app)

// * Websocket server configuration 🔧

const wss = new WebSocketServer({
  server: httpServer,
  path: '/',
})

// * Apollo configuration 🔧

const webSocketApollo = useServer(
  {
    schema: apolloSchema,
    context: wsContext,
    onConnect: async (ctx) => {
      //
    },
    onDisconnect(ctx, code, reason) {
      //
    },
  },
  wss,
)

const graphQLServer =
  new ApolloServer<ApolloContext>({
    schema: apolloSchema,
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
              await webSocketApollo.dispose()
            },
          }
        },
      },
    ],
  })

// * Start Server 🛸

const start = async () => {
  await graphQLServer.start()

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: [
        'http://localhost',
        'http://localhost:4000',
        'http://localhost:3000',
      ],
      optionsSuccessStatus: 200,
    }),
    bodyParser.json(),
    expressMiddleware(graphQLServer, {
      context,
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(
    `Apollo-server iniciado http://localhost:4000/ 🎇`,
  )
}
start()
