import { type_auth } from './auth/T.auth'
import { type_comment } from './comment/T.comment'
import { type_filter } from './FilterInput/T.filterInput'
import { type_post } from './post/T.post'
import { type_user } from './user/T.user'

export const typeDefs = `#graphql
  type Query {
    _root_: Boolean
  }
  type Mutation {
    _root_: Boolean
  }
  type Subscription {
    _root_: Boolean
  }
  ${type_filter}
  ${type_post}
  ${type_user}
  ${type_comment}
  ${type_auth}
`
