import { type_auth } from './auth/T.auth'
import { type_comment } from './schemas/comment/T.comment'
import { type_filter } from './schemas/FilterInput/T.filterInput'
import { type_post } from './schemas/post/T.post'
import { type_user } from './schemas/user/T.user'

export const schema = `#graphql
  type Query {
    _root_: Boolean
  }
  type Mutation {
    _root_: Boolean
  }
  ${type_filter}
  ${type_post}
  ${type_user}
  ${type_comment}
  ${type_auth}
`
