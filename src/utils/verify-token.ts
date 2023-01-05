import jwt from 'jsonwebtoken'
export const verifyToken = (
  theToken?: string | undefined,
) => {
  let token = ''
  let userId = ''
  let error = false

  if (theToken) {
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

  return {
    token,
    userId,
    error,
  }
}
