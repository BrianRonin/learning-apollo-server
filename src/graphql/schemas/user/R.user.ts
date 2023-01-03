import { GraphQLError } from 'graphql'

const resolver_users = async (
  parent,
  args,
  { db },
) => {
  if (args?.filter) {
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
  { password, userInput },
  { db, user },
) => {
  if (!user?.token)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  await db.ds_user.validatePassword({
    user,
    password,
  })
  return await db.ds_user.updateUser(
    userInput,
    user.userId,
  )
}

const resolver_deleteUser = async (
  parent,
  { password },
  { db, user },
) => {
  if (!user?.token)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  await db.ds_user.validatePassword({
    user,
    password,
  })
  return await db.ds_user.deleteUser(user.userId)
}

const resolver_me = async (
  parent,
  _,
  { db, user },
) => {
  if (!user?.token)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  return await db.ds_user.queryMe(user)
}

export const user_resolvers = {
  Query: {
    user: resolver_user,
    users: resolver_users,
    me: resolver_me,
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
