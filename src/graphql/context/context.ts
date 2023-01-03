import jwt from 'jsonwebtoken'
import { datasource_auth } from '../auth/D.auth'
import { datasource_comment } from '../schemas/comment/D.comment'
import { datasource_post } from '../schemas/post/D.post'
import { datasource_user } from '../schemas/user/D.user'

export const context = async ({ req, res }) => {
  let token = ''
  let userId = ''
  let error = false
  const verify = (theToken: string) => {
    try {
      const [_, _token_] = theToken.split(' ')
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
      error = e
    }
  }
  if (req.headers.authorization) {
    verify(req.headers.authorization)
  }
  token = jwt.sign(
    { userId: 'N23dIDS' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
  return {
    res,
    user: { token, userId, error },
    db: {
      ds_post: new datasource_post(),
      ds_user: new datasource_user(),
      ds_comment: new datasource_comment(),
      ds_auth: new datasource_auth(),
    },
  }
}
