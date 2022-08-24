import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getLogs = async () => {
    const response = await instance.get(`/logs`, {
        params: { perPage: 0, order: -1}
    });
    return response.data;
}