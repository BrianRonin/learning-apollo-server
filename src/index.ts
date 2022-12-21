import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { db } from './db'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import { Database } from './graphql/types'

type Context = {
  db: Database
}

const server = new ApolloServer<Context>({
  typeDefs: schema,
  resolvers: resolvers,
})

const start = async () => {
  const { url } = await startStandaloneServer(
    server,
    {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        const database = await db()
        return {
          db: database,
        }
      },
    },
  )

  console.log('servidor escutando ' + url)
}
start()
