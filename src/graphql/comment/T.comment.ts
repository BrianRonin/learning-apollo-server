export const type_comment = `#graphql
  type Comment {
    id: ID!
    comment: String!
    userId: String!
    postId: String!
    indexRef: Int!
    createdAt: String!
  }

  extend type Query {
    comments(filter: FilterInput): [Comment!]!
    comment(id: ID!): Comment
  }
`
