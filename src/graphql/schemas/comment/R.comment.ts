import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { withFilter } from 'graphql-subscriptions/dist/with-filter'
export const pubSub = new PubSub()

const comments = async (
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

const comment = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_comment.getComment(id)
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
    const comment =
      await db.ds_comment.createComment(
        data,
        user.userId,
      )
    await pubSub.publish('CREATED_COMMENT', {
      onCreateComment: {
        ...comment,
        postOwner: postExist.userId,
      },
    })
    return comment
  }
  return new GraphQLError('post not exists')
}

export const comment_resolvers = {
  Query: {
    comment,
    comments,
  },
  Mutation: {
    createComment,
  },
  Subscription: {
    onCreateComment: {
      subscribe: withFilter(
        () =>
          pubSub.asyncIterator('CREATED_COMMENT'),
        (payload, variables) => {
          console.log('payload: ', payload)
          console.log('variables: ', variables)
          return true
        },
      ),
    },
  },
  General: {
    Comment: {
      user: async (parent, _, { db }) => {
        if (parent?.user_id) {
          return await db.ds_user.getUser.load(
            parent.user_id,
          )
        }
        return null
      },
    },
  },
}
