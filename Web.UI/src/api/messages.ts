import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMessages = async (userDest: number, userSrc: number) => {
    const response = await instance.get(`/chatMessages?userDest=${userDest}&userSrc=${userSrc}`);
    return response.data;
}