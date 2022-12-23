const resolver_posts = (parent, args, { db }) => {
  if (args.filter) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    return db.ds_post.getPosts(search)
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
  if (resolve.timeout) {
    return {
      statusCode: 408,
      message: resolve.message,
    }
  }
  if (resolve.statusCode === 404) {
    return {
      statusCode: 404,
      message: resolve.message,
    }
  }
  return resolve
}

const resolver_createPost = async (
  parent,
  { postInput },
  { db },
) => {
  return await db.ds_post.createPost(postInput)
}
const resolver_updatePost = async (
  parent,
  { id, postInput },
  { db },
) => {
  return await db.ds_post.updatePost(
    id,
    postInput,
  )
}
const resolver_deletePost = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_post.deletePost(id)
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
    },
  },
}
