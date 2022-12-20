export const resolver_comments = (
  parent,
  args,
  { db: { comments } },
) => {
  return comments()
}

export const resolver_comment = (
  parent,
  { id },
  { db: { comments } },
) => {
  return comments(id)
}
