'use client'

import Image from 'next/image'
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TableUstadz({ ustadzList, token }) {
    const router = useRouter();

    if (ustadzList?.message === 'Token tidak valid') {
        toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
        setTimeout(() => {
            signOut({ callbackUrl: '/admin/login' });
        }, 3000);
    }

    async function handleDelete(id) {
        const konfirmasi = confirm("Yakin ingin menghapus ustadz ini?");
        if (!konfirmasi) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Ustadz berhasil dihapus!");
                router.refresh(); // Refresh halaman agar data terbaru di-fetch ulang
            } else {
                toast.error(data.message || "Gagal menghapus ustadz");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan saat menghapus");
        }
    }

    const data = ustadzList;

    return (
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto ">
            <Link href="/admin/ustadz/tambah">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
                    + Tambah Ustadz
                </button>
            </Link>
            <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Nama</th>
                        <th className="p-2 border">Bio</th>
                        <th className="p-2 border">Kontak</th>
                        <th className="p-2 border">Foto</th>
                        <th className="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ustadz) => (
                        <tr key={ustadz.id}>
                            <td className="p-2 border">{ustadz.nama}</td>
                            <td className="p-2 border">{ustadz.bio}</td>
                            <td className="p-2 border">{ustadz.kontak}</td>
                            <td className="p-2 border">
                                {ustadz.foto ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE}/${ustadz.foto}`}
                                        alt={ustadz.nama}
                                        width={500}
                                        height={500}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    <span>Tidak ada foto</span>
                                )}
                            </td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => router.push(`/admin/ustadz/edit/${ustadz.id}`)}
                                    className="text-blue-600 hover:underline">Edit</button>
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
