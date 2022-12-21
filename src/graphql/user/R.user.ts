export const resolver_users = (
  parent,
  args,
  { db: { users } },
) => {
    if(args.filter){
    const search = new URLSearchParams(args.filter).toString()
    return users('?' + search)
  }

  return users()
}

export const resolver_user = (
  parent,
  { id },
  { db: { users } },
) => {
  return users(id)
}
