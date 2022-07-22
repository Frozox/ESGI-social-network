import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMyFriends = async (id: number) => {
    const response = await instance.get(`/friend/${id}`);
    return response.data;
}

export const addNewFriend = async (payload: any) => {
    const response = await instance.post(`/friends`, payload);
    return response.data;
}

export const acceptFriend = async (payload: any, id: string) => {
    const response = await instance.put(`/friend/${id}`, payload);
    return response.data;
}