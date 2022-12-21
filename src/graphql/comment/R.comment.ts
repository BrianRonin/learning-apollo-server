export const resolver_comments = (
  parent,
  args,
  { db: { comments } },
) => {
  if(args.filter){
    const search = new URLSearchParams(args.filter).toString()
    return comments('?' + search)
  }

  return comments()
}

export const resolver_comment = (
  parent,
  { id },
  { db: { comments } },
) => {
  return comments(id)
}
