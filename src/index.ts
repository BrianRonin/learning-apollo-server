import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { datasource_comment } from './graphql/comment/D.comment'
import { datasource_post } from './graphql/post/D.post'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import { datasource_user } from './graphql/user/D.user'

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
})

const start = async () => {
  const { url } = await startStandaloneServer(
    server,
    {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        return {
          db: {
            ds_post: new datasource_post(),
            ds_user: new datasource_user(),
            ds_comment: new datasource_comment(),
          },
        }
      },
    },
  )

  console.log('servidor escutando ' + url)
}
start()
