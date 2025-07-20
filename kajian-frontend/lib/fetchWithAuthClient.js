'use client';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export async function fetchWithAuthClient(url, token, options = {}) {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (data.message === 'Token tidak valid') {
            toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
            setTimeout(() => {
                signOut({ callbackUrl: '/admin/login' });
            }, 3000);
            return null;
        }

        if (!res.ok) {
            toast.error(data.message || 'Gagal mengambil data dari server');
            return null;
        }

        return data;
    } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data');
        console.error(error);
        return null;
    }
}
