import { comments } from '../../../db.json'
import knex from '../config/db'
import { dateISOtoMySQL } from './date-iso-to-mysql'

const commentsForDb = comments.map((e) => {
  return {
    comment: e.comment,
    user_id: e.userId,
    post_id: e.postId,
    created_at: dateISOtoMySQL(e.createdAt),
  }
})

knex('comments')
  .insert(commentsForDb)
  .then((e) => console.log(e))
  .catch((e) => console.log(e))
