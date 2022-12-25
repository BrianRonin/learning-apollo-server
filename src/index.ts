import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { datasource_auth } from './graphql/auth/D.auth'
import { datasource_comment } from './graphql/comment/D.comment'
import { datasource_post } from './graphql/post/D.post'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import { datasource_user } from './graphql/user/D.user'
import bcrypt from 'bcrypt'
import jwt, {
  JsonWebTokenError,
  JwtPayload,
} from 'jsonwebtoken'

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
        let token = ''
        let userId = ''
        let error = false
        if (req.headers.authorization) {
          try {
            const [_, _token_] =
              req.headers.authorization.split(' ')
            const payload = jwt.verify(
              _token_,
              process.env.JWT_SECRET,
            )
            if (
              typeof payload !== 'string' &&
              typeof payload.userId === 'string'
            ) {
              token = _token_
              userId = payload.userId
            }
          } catch (e) {
            error = e.message
          }
        }
        return {
          user: { token, userId, error },
          db: {
            ds_post: new datasource_post(),
            ds_user: new datasource_user(),
            ds_comment: new datasource_comment(),
            ds_auth: new datasource_auth(),
          },
        }
      },
    },
  )

  console.log('servidor escutando ' + url)
}
start()
