import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
const DEFAULT_TOKEN = import.meta.env.VITE_API_DEFAULT_TOKEN || '410e1ef3e03468e1d2fb6df16d961b2f7431a836';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm token mặc định vào mọi request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || DEFAULT_TOKEN; // Lấy từ localStorage hoặc dùng token mặc định
        config.headers.Authorization = `Token ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;