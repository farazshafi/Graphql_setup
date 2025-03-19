import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $email: String!, $isActive: Boolean!) {
    createUser(name: $name, age: $age, email: $email, isActive: $isActive) {
      id
      name
      email
      age
      isActive
    }
  }
`;