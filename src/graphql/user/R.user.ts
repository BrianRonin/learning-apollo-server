export const resolver_users = (
  parent,
  args,
  { db: { users } },
) => {
  return users()
}

export const resolver_user = (
  parent,
  { id },
  { db: { users } },
) => {
  return users(id)
}
