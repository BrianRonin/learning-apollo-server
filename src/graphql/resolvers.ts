import { resolver_comment, resolver_comments } from "./comment/R.comment"
import { FilterInput } from "./FilterInput/R.filterInput"
import { post_resolvers } from "./post/R.post"
import { resolver_user, resolver_users } from "./user/R.user"

export const resolvers = {
  Query: {
    ...post_resolvers.Query,
    user: resolver_user,
    users: resolver_users,
    comment: resolver_comment,
    comments: resolver_comments,
    hello: () => {
      return 'ola amiguinho'
    },
  },
  Post: {
    idade: (parent, args, context, info) => {
      console.log('parent: ', parent)
      console.log('info: ', info)
      return 5
    }
  },
  ...post_resolvers.General,
  ...FilterInput,
}