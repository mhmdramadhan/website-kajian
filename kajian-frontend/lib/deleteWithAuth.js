'use client';
import { toast } from 'sonner';

export async function deleteWithAuth(url, token) {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || 'Gagal menghapus data');
            return false;
        }

        toast.success('Data berhasil dihapus!');
        return true;
    } catch (error) {
        toast.error('Terjadi kesalahan saat menghapus');
        console.error(error);
        return false;
    }
}
