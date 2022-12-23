const resolver_comments = async (
  parent,
  args,
  { db },
) => {
  if (args.filter) {
    const search = new URLSearchParams(
      args.filter,
    ).toString()
    return await db.ds_comment.getComments(
      '?' + search,
    )
  }
  return await db.ds_comment.getComments()
}

const resolver_comment = async (
  parent,
  { id },
  { db },
) => {
  return await db.ds_comment.getComment.load(id)
}

export const comment_resolvers = {
  Query: {
    comment: resolver_comment,
    comments: resolver_comments,
  },
}
