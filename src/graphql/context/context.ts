import { verifyToken } from '../../utils/verify-token'
import { datasource_auth } from '../auth/D.auth'
import { datasource_comment } from '../schemas/comment/D.comment'
import { datasource_post } from '../schemas/post/D.post'
import { datasource_user } from '../schemas/user/D.user'

export const context = async ({ req, res }) => {
  const user = verifyToken(
    req.headers.authorization,
  )

  return {
    user,
    db: {
      ds_post: new datasource_post(),
      ds_user: new datasource_user(),
      ds_comment: new datasource_comment(),
      ds_auth: new datasource_auth(),
    },
  }
}
