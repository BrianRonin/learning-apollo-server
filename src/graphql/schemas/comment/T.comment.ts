export const type_comment = `#graphql
  type Comment {
    id: ID!
    comment: String!
    user: User!
  }

  input CreateComment {
    comment: String!
    postId: String!
  }

  extend type Query {
    comments(filter: FilterInput): [Comment!]!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(data: CreateComment!): Comment!
  }
`
