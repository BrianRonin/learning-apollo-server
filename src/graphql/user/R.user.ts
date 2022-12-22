import { type_post } from '../post/T.post'

export const resolver_users = async (
  parent,
  args,
  { db: { users } },
) => {
  if (args.filter) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    return users('?' + search)
  }
  const resolve = await users()
  return resolve
}

export const resolver_user = async (
  parent,
  { id },
  { db: { user } },
) => {
  return await user.load(id)
}

export const user_resolvers = {
  Query: {
    user: resolver_user,
    users: resolver_users,
  },
  General: {
    User: {
      posts: async (
        parent,
        __,
        { db: { postsByUserId } },
      ) => {
        return await postsByUserId.load(parent.id)
      },
    },
  },
}
