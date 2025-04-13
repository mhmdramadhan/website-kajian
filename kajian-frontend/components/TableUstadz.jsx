'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTable, useSortBy, usePagination } from '@tanstack/react-table';

export default function TableUstadz({ ustadzList, token }) {
    const [data, setData] = useState(ustadzList);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Yakin ingin menghapus ustadz ini?");
        if (!confirm) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/ustadz/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Gagal hapus");

            toast.success("Ustadz berhasil dihapus");
            setData(data.filter((u) => u.id !== id));
        } catch (err) {
            toast.error("Terjadi kesalahan saat menghapus");
        }
    };

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
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(ustadz.id)}
                                >
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
