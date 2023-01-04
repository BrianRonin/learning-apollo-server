import { GraphQLError } from 'graphql'

const resolver_comments = async (
  parent,
  args,
  { db, user },
) => {
  if (!user?.token || !user?.userId)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })
  return await db.ds_comment.getComments()
}

const resolver_comment = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_comment.getComment(id)
}

const commentUser = async (parent, _, { db }) => {
  let user
  if (parent?.user_id) {
    user = await db.ds_user.getUser.load(
      parent.user_id,
    )
  }
  // console.log(parent)
  return user
}

const createComment = async (
  _,
  { data },
  { db, user },
) => {
  if (!user?.token || !user?.userId)
    throw new GraphQLError('unauthorized', {
      extensions: { code: 401 },
    })

  const postExist = await db.ds_post.getPost.load(
    data.postId,
  )
  if (postExist?.userId) {
    return await db.ds_comment.createComment(
      data,
      user.userId,
    )
  }
  return new GraphQLError('post not exists')
}

export const comment_resolvers = {
  Query: {
    comment: resolver_comment,
    comments: resolver_comments,
  },
  Mutation: {
    createComment,
  },
  General: {
    Comment: {
      user: commentUser,
    },
  },
}
