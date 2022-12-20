import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { db } from './db'
import {
  resolver_comment,
  resolver_comments,
} from './graphql/comment/R.comment'
import {
  resolver_post,
  resolver_posts,
} from './graphql/post/R.post'
import { schema } from './graphql/schema'
import { Database } from './graphql/types'
import {
  resolver_user,
  resolver_users,
} from './graphql/user/R.user'

type Context = {
  db: Database
}

const server = new ApolloServer<Context>({
  typeDefs: schema,
  resolvers: {
    Query: {
      posts: resolver_posts,
      post: resolver_post,
      user: resolver_user,
      users: resolver_users,
      comment: resolver_comment,
      comments: resolver_comments,
      hello: () => {
        return 'ola amiguinho'
      },
    },
  },
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
