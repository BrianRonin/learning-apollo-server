const resolver_auth = async (
  parent,
  { email, password },
  { db },
) => {
  return await db.ds_auth.auth(email, password)
}

export const auth_resolvers = {
  Mutation: {
    auth: resolver_auth,
  },
}
