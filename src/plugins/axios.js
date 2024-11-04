import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/api', // Laravel APIのURL
    headers: { 'Content-Type': 'application/json' },
});

// リクエスト時に認証トークンを追加
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;