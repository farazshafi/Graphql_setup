import { createUser, getUserById, getUsers, getUsersLength, User } from "../../data/userData";


export const userResolver = {
    Query: {
        getUsers: (): User[] => getUsers(),
        getUserById: (parent, args): User => {
            const { id } = args
            return getUserById(id)
        }
    },

    Mutation: {
        createUser: (parent, args):User => {
            const { name, email, isActive, age } = args
            const newUser:User = {
                id: (getUsersLength() + 1).toString(),
                name,
                email,
                isActive,
                age
            }
            return createUser(newUser)
        }
    }
}