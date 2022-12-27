const resolver_auth = async (
  parent,
  { email, password },
  { db, res },
) => {
  return await db.ds_auth.auth(
    email,
    password,
    res,
  )
}

export const auth_resolvers = {
  Mutation: {
    auth: resolver_auth,
  },
}
