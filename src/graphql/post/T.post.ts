export const type_post = `#graphql
 type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    idade: Int!
    user: User!
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
`
