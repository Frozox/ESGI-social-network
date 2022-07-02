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