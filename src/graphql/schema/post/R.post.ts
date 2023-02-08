import { GraphQLError } from 'graphql'

const resolver_posts = (parent, args, { db }) => {
  if (args.filter || args.userId) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    return db.ds_post.getPosts(
      args.userId
        ? `?userId=${encodeURIComponent(
            args.userId,
          )}`
        : search,
    )
  }
  return db.ds_post.getPosts()
}

const resolver_post = async (
  parent,
  { id },
  { db },
) => {
  const resolve = await db.ds_post.getPost.load(
    id,
  )
  console.log('resolve', resolve)
  if (resolve?.timeout) {
    return {
      statusCode: 408,
      message: resolve.message,
    }
  }
  if (resolve?.statusCode === 404) {
    return {
      statusCode: 404,
      message: resolve.message,
    }
  }
  if (typeof resolve === 'undefined') {
    return {
      statusCode: 404,
      message: 'error',
    }
  }
  return resolve
}

const resolver_createPost = async (
  parent,
  { postInput },
  { db, user },
) => {
  if (!user?.token || !user?.userId)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  return await db.ds_post.createPost(
    postInput,
    user,
  )
}
const resolver_updatePost = async (
  parent,
  { id, postInput },
  { db, user },
) => {
  if (!user?.token)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  return await db.ds_post.updatePost(
    id,
    postInput,
    user,
  )
}
const resolver_deletePost = async (
  parent,
  { id },
  { db, user },
) => {
  if (!user?.token)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  return await db.ds_post.deletePost(id, user)
}

export const post_resolvers = {
  Query: {
    post: resolver_post,
    posts: resolver_posts,
  },
  Mutation: {
    createPost: resolver_createPost,
    updatePost: resolver_updatePost,
    deletePost: resolver_deletePost,
  },
  General: {
    PostResult: {
      // As union
      __resolveType: (obj) => {
        if (obj.statusCode === 404)
          return 'PostNotFoundError'
        if (obj.timeout) return 'PostTimeoutError'
        if (obj.id) return 'Post'
        return null
      },
    },
    PostError: {
      // As interface
      __resolveType: (obj) => {
        if (obj.postId) return 'PostNotFoundError'
        if (obj.timeout) return 'PostTimeoutError'
        return null
      },
    },
    Post: {
      user: async (parent, __, { db }) => {
        return await db.ds_user.getUser.load(
          parent.userId,
        )
      },
      comments: async ({ id }, __, { db }) => {
        return await db.ds_comment.getComment.load(
          id,
        )
      },
    },
  },
}
