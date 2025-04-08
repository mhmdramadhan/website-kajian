import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Ganti dengan base URL backend kamu
    withCredentials: true
});

// Intercept error token
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            // Token kadaluarsa atau tidak valid
            Router.push('/admin/login');
        }
        return Promise.reject(err);
    }
);

export default api;
