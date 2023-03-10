export const type_user = `#graphql
 type User {
    id: ID!
    userName: String!
    password: String
    email: String
    indexRef: Int!
    createdAt: String!
    posts: [Post]!
  }

  input CreateUser {
    userName: String!
    password: String!
    email: String!
  }

  input UpdateUser {
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
