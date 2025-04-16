'use client'

import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function TableUstadz({ ustadzList, token }) {
    const router = useRouter();

    useEffect(() => {
        // jika token habis
        if (ustadzList?.message === 'Token tidak valid') {
            toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
            setTimeout(() => {
                signOut({ callbackUrl: '/admin/login' });
            }, 5000);
        }
    }, [ustadzList]);

    async function handleDelete(id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/ustadz/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            toast.success("Berhasil dihapus");
            router.refresh(); // SSR reload
        } else {
            toast.error("Gagal menghapus ustadz");
        }
    }

    const data = ustadzList;


    return (
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
                + Tambah Ustadz
            </button>
            <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Nama</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">No HP</th>
                        <th className="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ustadz) => (
                        <tr key={ustadz.id}>
                            <td className="p-2 border">{ustadz.nama}</td>
                            <td className="p-2 border">{ustadz.email}</td>
                            <td className="p-2 border">{ustadz.no_hp}</td>
                            <td className="p-2 border space-x-2">
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button
                                    onClick={() => handleDelete(ustadz.id)}
                                    className="text-red-600 hover:underline">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
