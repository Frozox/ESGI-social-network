import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMyUser = async () => {
    const response = await instance.get(`/users/me`);
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await instance.get(`/users/${id}`);
    return response.data;
}

export const createUser = async (payload: any) => {
    console.log(payload);
    const response = await instance.post(`/users`, payload);
    console.log(response);
    return response.data;
}

export const loginUser = async (payload: any) => {
    const response = await instance.post(`/login`, payload);
    return response.data;
}
