import React, { lazy } from 'react'
import { useQuery, gql } from "@apollo/client"

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean,

}

const GetUsers = gql`
  query GetAllUsers{
  getUsers {
    age
    name
    email
    id
    isActive
  }
}
`;

const App = () => {
  const { loading, error, data } = useQuery(GetUsers)

  if (loading) return <h3>Loading...</h3>
  if (error) return <h3>Error: {error?.message}</h3>

  return (
    <div>
      <h3>Available Users</h3>
      <div>
        {data.getUsers.map((user:User) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App