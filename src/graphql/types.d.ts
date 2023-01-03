type meta = {
  id: string
  indexRef: number
}

export type User = {
  firstName: string
  lastName: string
  userName: string
  createdAt: string
} & meta

export type Post = {
  title: string
  body: string
  userId: string
  createdAt: string
} & meta

export type Comment = {
  id: number
  comment: string
} & meta

export type Database = {
  users: User[]
  posts: Post[]
  comments: Comment[]
}
