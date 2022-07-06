import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMyFriends = async () => {
    const response = await instance.get(`/friends`);
    return response.data;
}

export const addNewFriend = async (payload: any) => {
    const response = await instance.post(`/friends`, payload);
    return response.data;
}