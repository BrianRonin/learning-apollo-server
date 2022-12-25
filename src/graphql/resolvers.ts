import { auth_resolvers } from './auth/R.auth'
import { comment_resolvers } from './comment/R.comment'
import { FilterInput } from './FilterInput/R.filterInput'
import { post_resolvers } from './post/R.post'
import { user_resolvers } from './user/R.user'

export const resolvers = {
  Query: {
    _root_: () => true,
    ...post_resolvers.Query,
    ...user_resolvers.Query,
    ...comment_resolvers.Query,
  },
  Mutation: {
    _root_: () => true,
    ...user_resolvers.Mutation,
    ...post_resolvers.Mutation,
    ...auth_resolvers.Mutation,
  },
  ...post_resolvers.General,
  ...user_resolvers.General,
  ...FilterInput,
}
