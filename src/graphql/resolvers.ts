import { auth_resolvers } from './auth/R.auth'
import { comment_resolvers } from './schemas/comment/R.comment'
import { FilterInput } from './schemas/FilterInput/R.filterInput'
import { post_resolvers } from './schemas/post/R.post'
import { user_resolvers } from './schemas/user/R.user'

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
    ...comment_resolvers.Mutation,
  },
  Subscription: {
    _root_: () => true,
    ...comment_resolvers.Subscription,
  },
  ...post_resolvers.General,
  ...user_resolvers.General,
  ...comment_resolvers.General,
  ...FilterInput,
}
