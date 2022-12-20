export const type_user = `#graphql
 type User {
    id: ID
    firstName: String
    lastName: String
    userName: String
    indexRef: Int
    createdAt: String
    # posts: [Post!]!
  }

  extend type Query {
    users: [User]!
    user(id: ID!): User
  }
`
