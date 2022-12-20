import { type_comment } from './comment/T.comment'
import { type_post } from './post/T.post'
import { type_user } from './user/T.user'

export const schema = `#graphql
  ${type_post}
  ${type_user}
  ${type_comment}

  type Hello {
    content: String
  }
  type Query {
    _empty: Boolean
    hello: String
  } 
`
