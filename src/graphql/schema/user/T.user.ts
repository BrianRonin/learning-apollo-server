export const type_user = `#graphql
 type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    password: String
    email: String
    indexRef: Int!
    createdAt: String!
    posts: [Post]!
  }

  input CreateUser {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    email: String!
  }

  input UpdateUser {
    firstName: String
    lastName: String
    userName: String
    password: String
    email: String
  }

  extend type Query {
    users(filter: FilterInput): [User]!
    user(id: ID!): User
    me: User!
  }
  
  extend type Mutation {
    updateUser(password: String!, userInput: UpdateUser!): User!
    createUser(userInput: CreateUser!): Boolean!
    deleteUser(password: String!): Boolean!
  }
`
