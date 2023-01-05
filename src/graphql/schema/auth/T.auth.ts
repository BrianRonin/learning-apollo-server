export const type_auth = `#graphql

  type AuthReturn {
    token: String!
    expires: String!
  }

  extend type Mutation {
    auth(email: String!, password: String!): AuthReturn!
  }

`
