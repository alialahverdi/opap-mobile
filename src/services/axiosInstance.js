import axios from 'axios';
import { BASE_URL } from './BaseUrl';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(config => {
    return config;
});

axiosInstance.interceptors.response.use(res => {
    return res.data;
}, (error) => {
    const { data } = error.response;
    console.log(data)
    return Promise.reject(data);
});


export default axiosInstance;