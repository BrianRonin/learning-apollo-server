const resolver_users = async (
  parent,
  args,
  { db },
) => {
  if (args.filter) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    return await db.ds_user.getUsers('?' + search)
  }
  return await db.ds_user.getUsers()
}

const resolver_user = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_user.getUser.load(id)
}

const resolver_createUser = async (
  parent,
  { userInput },
  { db },
) => {
  return await db.ds_user.createUser(userInput)
}

const resolver_updateUser = async (
  parent,
  { id, userInput },
  { db },
) => {
  return await db.ds_user.updateUser(
    id,
    userInput,
  )
}

const resolver_deleteUser = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_user.deleteUser(id)
}

export const user_resolvers = {
  Query: {
    user: resolver_user,
    users: resolver_users,
  },
  Mutation: {
    createUser: resolver_createUser,
    updateUser: resolver_updateUser,
    deleteUser: resolver_deleteUser,
  },
  General: {
    User: {
      posts: async (parent, __, { db }) => {
        return await db.ds_post.getPostsByUserId.load(
          parent.id,
        )
      },
    },
  },
}
