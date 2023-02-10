import { verifyToken } from '../../utils/verify-token'
import { datasource_auth } from '../schema/auth/D.auth'
import { datasource_comment } from '../schema/comment/D.comment'
import { datasource_post } from '../schema/post/D.post'
import { datasource_user } from '../schema/user/D.user'

export interface ApolloContext {
  db: {
    ds_post: datasource_post
    ds_user: datasource_user
    ds_comment: datasource_comment
  }
}

export const context = async ({ req, res }) => {
  const user = verifyToken(
    req.headers.authorization,
  )

  // if (req && req.headers) {
  // const cookies = cookieParser(
  // )
  // console.log(req.headers)
  // }

  return {
    req,
    res,
    user,
    db: {
      ds_post: new datasource_post(),
      ds_user: new datasource_user(),
      ds_comment: new datasource_comment(),
      ds_auth: new datasource_auth(),
    },
  }
}
