import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getMessages = async (userDest: number, userSrc: number) => {
    const response = await instance.get(`/chatMessages?userDest=${userDest}&userSrc=${userSrc}`);
    return response.data;
}

export const sendMessage = async (message: string, userDest: number, userSrc: number) => {
    const response = await instance.post(`/chatMessages`, {
        postgres: {
            userDest: userDest,
            userSrc: userSrc,
            explicit: false,
            sendAt: new Date(),
            receivedAt: null,
            updatedAt: new Date(),
            deletedAt: null,
        },
        mongo: {
            content: message,
            userDest: userDest,
            userSrc: userSrc,
        }
    });
    return response.data;
}