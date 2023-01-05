export const type_filter = `#graphql

  enum Order {
    ASC
    DESC
  }

  input FilterInput {
    _sort: String
    _order: Order
    _start: String
    _limit: String
  }
`
