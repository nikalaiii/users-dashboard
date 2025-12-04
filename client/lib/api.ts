import axios from "axios";

export interface User {
    id: number;
    name: string;
    company: string;
    email: string;
    adress: string;
    city: string;
}

export const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export async function getUsers(search?: string): Promise<User[]> {
    const response = await api.get<User[]>('/users', {
        params: search ? { search } : undefined
    });
    return response.data;
}

export async function deleteUser(id: number): Promise<void> {
    return api.delete(`/users/${id}`);
}


export async function createUser(newUser:Omit<User, 'id'>) {
    const createdUser = await api.post<User>('/users', newUser);
    return createdUser.data;
}