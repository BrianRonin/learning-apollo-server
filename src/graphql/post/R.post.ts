export const resolver_posts = (
  parent,
  args,
  { db: { posts } },
) => {
  return posts()
}

export const resolver_post = (
  parent,
  { id },
  { db: { posts } },
) => {
  return posts(id)
}
