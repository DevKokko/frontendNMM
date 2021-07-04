import axios from 'axios';
import { NODE_RED_IP } from './IPconfig';

const instance = axios.create({
    baseURL: 'https://' + NODE_RED_IP, 
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
});

export default instance;