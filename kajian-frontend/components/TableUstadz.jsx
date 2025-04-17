'use client'

import Image from 'next/image'
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from 'react';

export default function TableUstadz({ token }) {
    const [ustadzList, setUstadzList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const totalPages = Math.ceil(totalItems / pageSize);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC');
    const router = useRouter();

    if (ustadzList?.message === 'Token tidak valid') {
        toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
        setTimeout(() => {
            signOut({ callbackUrl: '/admin/login' });
        }, 3000);
    }

    // Filter & paginate data
    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz?page=${page}&limit=${pageSize}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        console.log('data fetched:', data); // 👈 Cek data ini setelah delete
        setUstadzList(data.data);
        setTotalItems(data.total);
        setLoading(false);
    };

    // sort ustadz
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(field);
            setSortOrder('ASC');
        }
        setPage(1); // reset ke halaman 1 saat sorting berubah
    };

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

            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (res.ok) {
                toast.success("Ustadz berhasil dihapus!");
                fetchData(); // Panggil ulang fetch, bukan router.refresh
            } else {
                console.log(data);

                toast.error(data.message || "Gagal menghapus ustadz");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan saat menghapus");
        }
    }

    useEffect(() => {
        fetchData();
    }, [page, pageSize, searchQuery,
        sortBy, sortOrder]); // Memastikan fetchData dipanggil saat state ini berubah

    return (
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto ">
            <Link href="/admin/ustadz/tambah">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
                    + Tambah Ustadz
                </button>
            </Link>

            {/* filter */}
            <div className="flex justify-between mb-4 items-center">
                <input
                    type="text"
                    placeholder="Cari ustadz..."
                    className="border px-3 py-2 rounded w-full max-w-xs"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPage(1); // reset ke halaman 1 tiap cari
                    }}
                />

                <select
                    className="ml-4 border px-3 py-2 rounded"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    <option value={2}>2 / halaman</option>
                    <option value={5}>5 / halaman</option>
                    <option value={10}>10 / halaman</option>
                    <option value={20}>20 / halaman</option>
                </select>
            </div>
            {loading ? (
                <>
                    <p>Loading data ustadz...</p>
                    <div className="flex justify-center mt-4">
                        <svg
                            className="animate-spin h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"
                            />
                        </svg>
                    </div>
                </>

            ) : (
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2 border" onClick={() => handleSort('nama')}>
                                Nama
                                {sortBy === 'nama' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-2 border">Bio</th>
                            <th className="p-2 border">Kontak</th>
                            <th className="p-2 border">Foto</th>
                            <th className="p-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ustadzList && ustadzList.length > 0 ? (
                            ustadzList.map((ustadz) => (
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
                            ))

                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center">
                                    Tidak ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Halaman {page} dari {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
