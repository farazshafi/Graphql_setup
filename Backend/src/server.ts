import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createUser, getUserById, getUsers, getUsersLength, User } from './data/userData';

// The GraphQL schema
const typeDefs = `#graphql
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

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        getUsers: (): User[] => {
            return getUsers()
        },
        getUserById: (parent, args) => {
            const { id } = args
            return getUserById(id)
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const { name, age, email, isActive } = args
            const newUser = {
                id: (getUsersLength() + 1).toString(),
                name,
                age,
                email,
                isActive
            }
            createUser(newUser)
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server);
    console.log(`🚀 Server ready at ${url}`);
}

startServer()