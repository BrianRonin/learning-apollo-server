export const type_post = `#graphql
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    user: User!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
  }

  type PostTimeoutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: Int!
  }

  union PostResult = PostNotFoundError | PostTimeoutError | Post

  extend type Query {
    posts(filter: FilterInput): [PostResult]!
    post(id: ID!): PostResult!
  }

  extend type Mutation {
    createPost(postInput: CreatePostInput!): Post!
    updatePost(id: ID!, postInput: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }

`
