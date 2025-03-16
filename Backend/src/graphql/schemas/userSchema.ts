import { gql } from "graphql-tag"

export const userSchema = gql`
    type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!,age: Int!, email: String!, isActive: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    email: String
    isActive: Boolean,
  }
`;