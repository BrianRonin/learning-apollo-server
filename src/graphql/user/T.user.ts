export const type_user = `#graphql
 type User {
    id: ID!
    firstName: String
    lastName: String
    userName: String
    indexRef: Int
    createdAt: String
    posts: [Post]!
  }

  input CreateUser {
    firstName: String!
    lastName: String!
    userName: String!
  }

  input UpdateUser {
    firstName: String
    lastName: String
    userName: String
  }

  extend type Query {
    users(filter: FilterInput): [User]!
    user(id: ID!): User
  }
  extend type Mutation {
    createUser(userInput: CreateUser!): User!
    updateUser(id: ID!, userInput: UpdateUser!): User!
    deleteUser(id: ID!): Boolean!
  }
`
