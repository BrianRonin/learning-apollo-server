import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { datasource_post } from './graphql/post/D.post'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'

export interface Context {
  db: {
    post: datasource_post
  }
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
        return {
          db: {
            post: new datasource_post(),
          },
        }
      },
    },
  )

  console.log('servidor escutando ' + url)
}
start()
