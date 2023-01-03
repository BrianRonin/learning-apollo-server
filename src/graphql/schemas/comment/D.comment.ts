import { GraphQLError } from 'graphql'
import { MySQLDatasource } from '../../datasources/SQLDatasource'
import { Comment } from '../../types'

const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(
      comment.created_at,
    ).toISOString(),
  }
}

export class datasource_comment extends MySQLDatasource {
  async getComments(params = {}) {
    const comment: Comment = await this.db(
      'comments',
    )

    return comment
  }

  getComment = this.makeDataLoader(
    async (ids) => {
      const query = this.db('comments').whereIn(
        'post_id',
        ids,
      )
      const comments = await query
      const filteredComments = ids.map(
        (post_id) => {
          return comments
            .filter(
              (comment) =>
                String(comment.post_id) ===
                String(post_id),
            )
            .map((comment) => {
              return {
                comment: comment.comment,
                id: comment.id,
              }
            })
        },
      )
      return filteredComments
    },
  )
  //   (commentId: string) {
  //   const comment = await this.db(
  //     'comments',
  //   ).where({ id: commentId })
  //   return comment
  // }

  async createComment(
    { postId, comment },
    userId: string,
  ) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    }

    // const postExists = await

    const created = await this.db(
      'comments',
    ).insert(partialComment)

    console.log(created)
    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      comment: partialComment.comment,
    }
  }
}
