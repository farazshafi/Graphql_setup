import { gql } from "@apollo/client";

export const GetUsers = gql`
  query GetAllUsers {
    getUsers {
      id
      name
      email
      age
      isActive
    }
  }
`;