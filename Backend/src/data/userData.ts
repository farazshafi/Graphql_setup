export type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    isActive: boolean,
    
}


const users: User[] = [
    {
        "id": "1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30,
        "isActive": true,
        
    },
    {
        "id": "2",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "age": 28,
        "isActive": false,
        
    },
    {
        "id": "3",
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "age": 35,
        "isActive": true,
        
    }
]

export const getUsers = (): User[] => {
    return users
}
export const getUserById = (id: string): User | undefined => {
    return users.find((user) => user.id === id)
}
export const createUser = (newUser): User => {
    users.push(newUser)
    return newUser
}

export const getUsersLength = ():number => {
    return users.length
}