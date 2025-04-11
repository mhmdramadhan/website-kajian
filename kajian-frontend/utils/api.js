import axios from 'axios';
import { signOut } from 'next-auth/react'; // untuk next-auth logout

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true
});

api.interceptors.response.use(
  res => res,
  async err => {
    // Cek apakah error karena token expired atau tidak valid
    if (err.response?.status === 401) {
      // Token expired atau tidak valid
      console.log('Token expired. Logging out...');

      // Logout dari NextAuth
      await signOut({ callbackUrl: '/admin/login' });

      // Jika pakai localStorage, hapus manual juga (optional)
      localStorage.removeItem('user');
    }
    return Promise.reject(err);
  }
);

export default api;
