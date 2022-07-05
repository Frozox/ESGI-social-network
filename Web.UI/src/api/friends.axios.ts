import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMyFriends = async () => {
    const response = await instance.get(`/friends`);
    return response.data;
}