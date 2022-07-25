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
            updatedAt: null,
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

export const updateMessage = async (message: string, messageId: number) => {
    const response = await instance.put(`/chatMessages/${messageId}`, {
        postgres: {
            id: messageId,
            updatedAt: new Date(),
        },
        mongo: {
            content: message,
        }
    });
    return response.data;
}

export const deleteMessage = async (messageId: number) => {
    const response = await instance.delete(`/chatMessages/${messageId}`);
    return response.data;
}

export const getLastConversations = async (userId: number) => {
    const response = await instance.get(`/chatMessages/lastConversations?userId=${userId}`);
    return response.data;
}