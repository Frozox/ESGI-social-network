import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const checkLogin = async (payload: any) => {
    const response = await instanceWithoutAuth.post(`/login`, payload);
    return response.data;
}

export const registerAction = async (payload: any) => {

    const response = await instanceWithoutAuth.post(`/register`, payload);
    return response.data;
}
