const resolver_posts = (
  parent,
  args,
  { db: { posts } },
) => {
  console.log('args.filter: ' + args.filter)
  if(args.filter){
    const search = new URLSearchParams(args.filter).toString()
    console.log('search: ' + search)
    return posts('?' + search)
  }
  return posts()
}

const resolver_post = async (
  parent,
  {id},
  { db: { posts } },
) => {
  const post = await posts(id)
  if(Math.random() > 0.5) {
    return {
      statusCode: 404,
      message: 'Post not found!',
      timeout: 123
    }
  }
  if(typeof post.id === 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found!'
    }
  }
  return post
}


export const post_resolvers = {
  Query: {
    post: resolver_post,
    posts: resolver_posts
  },
  General: {
    PostResult: { // As union
      __resolveType: (obj) => {
        if(obj.postId) return 'PostNotFoundError'
        if(obj.timeout) return 'PostTimeoutError'
        if(obj.id) return 'Post'
        return null
      }
    },
    PostError: { // As interface
      __resolveType: (obj) => {
        if(obj.postId) return 'PostNotFoundError'
        if(obj.timeout) return 'PostTimeoutError'
        return null
      }
    },
    Post: {
      user: async (parent, __, { db: { users }}) => {
        const r = await users(parent.userId)
        if(r) return r
        return null
      }
    }
  }
}