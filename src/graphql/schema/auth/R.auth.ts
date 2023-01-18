import { CookieOptions } from 'express'

const resolver_auth = async (
  parent,
  { email, password },
  { db, req, res },
) => {
  return await db.ds_auth.auth(email, password)
}

export const auth_resolvers = {
  Mutation: {
    auth: resolver_auth,
  },
}
