export const type_comment = `#graphql
  
  type Comment {
    id: ID!
    comment: String!
    user: User!
    created_at: String!
  }

  input CreateComment {
    comment: String!
    postId: String!
  }

  extend type Query {
    comments(filter: FilterInput): [Comment!]!
    comment(id: ID!): [Comment!]! # Comment by post
  }

  extend type Mutation {
    createComment(data: CreateComment!): Comment!
  }

  extend type Subscription {
    onCreateComment: Comment!
  }
`
