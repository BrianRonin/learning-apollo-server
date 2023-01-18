import { MySQLDatasource } from '../../datasources/SQLDatasource'
import { Comment } from '../../types'

export class datasource_comment extends MySQLDatasource {
  async getComments(params = {}) {
    const comments: Comment[] = await this.db(
      'comments',
    )
    return comments
  }

  getComment = this.makeDataLoader(
    async (ids) => {
      const query = this.db('comments')
        .whereIn('post_id', ids)
        .select('*')
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
                ...comment,
                comment: comment.comment,
                id: comment.id,
                user_id: comment.user_id,
                post_id: comment.post_id,
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

    const created = await this.db(
      'comments',
    ).insert(partialComment)

    const newComment = {
      id: created[0],
      comment: partialComment.comment,
      createdAt: new Date(),
    }

    return newComment
  }
}
