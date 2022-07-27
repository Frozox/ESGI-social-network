import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMyUser = async (userId: number) => {
    const response = await instance.get(`/users/${userId}`);
    return response.data;
}

export const getMyUserByMail = async (mail: string) => {
    const response = await instance.get(`/users/${mail}`);
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await instance.get(`/users/${id}`);
    return response.data;
}

export const createUser = async (payload: any) => {
    console.log(Object.entries(payload.preferedLanguages));
    const response = await instance.post(`/register`, payload);
    return response.data;
}

export const editUser = async (id: number, payload: any) => {
    const response = await instance.put(`/users/${id}`, payload);
    return response.data;
}

export const loginUser = async (payload: any) => {
    const response = await instance.post(`/login`, payload);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await instance.get(`/users`);
    return response.data;
}

export const addFriendUser = async (payload: any) => {
    const response = await instance.post(`/friends`, payload);
    return response.data;
}

export const getAllUsersExceptMe = async (id: number) => {
    const response = await instance.get(`/me/${id}`);
    return response.data;
}
