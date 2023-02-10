import { verifyToken } from '../../utils/verify-token'
import { datasource_auth } from '../schema/auth/D.auth'
import { datasource_comment } from '../schema/comment/D.comment'
import { datasource_post } from '../schema/post/D.post'
import { datasource_user } from '../schema/user/D.user'

export const wsContext = async (
  ctx,
  msg,
  args,
) => {
  const user = verifyToken(
    ctx.connectionParams?.authorization,
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
