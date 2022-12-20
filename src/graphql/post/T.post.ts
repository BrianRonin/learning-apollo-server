export const type_post = `#graphql
 type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    # user: User!
  }

  extend type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`
