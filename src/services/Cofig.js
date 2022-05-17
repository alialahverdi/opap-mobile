import axios from 'axios';
import { BASE_URL } from './BaseUrl';

const client = axios.create({
    baseURL: BASE_URL
});

const call = async (
    method,
    url,
    data = {},
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
) => {
    const request = { headers, method, url }

    if (method !== 'get') request.data = data;
    else if (method === 'get') request.params = data;

    try {
        const response = await client(request)
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default {
    delete: (url, data = {}) => call('delete', url, data),
    get: (url, data = {}) => call('get', url, data),
    patch: (url, data = {}) => call('patch', url, data),
    post: (url, data = {}) => call('post', url, data),
    put: (url, data = {}) => call('put', url, data)
}