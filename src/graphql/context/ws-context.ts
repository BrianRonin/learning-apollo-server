import { verifyToken } from '../../utils/verify-token'

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
  }
}
