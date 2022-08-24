import axios from 'axios'

const API_URL = 'http://localhost:3000/';

const getBearer = () => {
    const token = localStorage.getItem('token');
    return token
}

export const getAxiosInstanceWithoutAuth = () => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
    });

    return axiosInstance;
}

export const getAxiosInstance = () => {
    const instance = axios.create({ baseURL: API_URL });

    instance.interceptors.request.use(
        (request: any) => {
            request.headers = {
                ...request.headers,
                Accept: 'application/json',
                Authorization: `Bearer ${getBearer()}`
            };

            return request;
        },
        (error: any) => Promise.reject(error),
    );

    return instance;
};

export const sendLogWithSeverity = async (severity: number, message: any) => {
    const instance = getAxiosInstance();

    const result = await instance.post('/log', {
        "message": message,
        "severity": severity
    }).catch(e => { return null; });

    if (!result)
        console.error(message);
}