import {
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextDidResolveSource,
} from '@apollo/server'
import { GraphQLTypeResolver } from 'graphql'
import { Context } from '../..'

const resolver_posts = (parent, args, { db }) => {
  if (args.filter) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    console.log('search: ' + search)
    return db.getPosts()
  }
  return posts()
}

const resolver_post = async (
  parent,
  { id },
  { db: { post } },
) => {
  const resolve = await post.load(id)
  if (resolve.timeout) {
    return {
      statusCode: 408,
      message: post.message,
    }
  }
  if (resolve.statusCode === 404) {
    return {
      statusCode: 404,
      message: post.message,
    }
  }
  return resolve
}

export const post_resolvers = {
  Query: {
    post: resolver_post,
    posts: resolver_posts,
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
      user: async (
        parent,
        __,
        { db: { user } },
      ) => {
        return await user.load(parent.userId)
      },
    },
  },
}
