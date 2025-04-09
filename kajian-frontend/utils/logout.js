import api from './api';

export const logout = async () => {
    try {
        await api.post('/api/auth/logout');
        window.location.href = '/admin/login';
    } catch (err) {
        console.error('Gagal logout:', err);
    }
};
