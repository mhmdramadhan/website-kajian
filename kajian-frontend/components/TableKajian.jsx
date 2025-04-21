'use client'

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TableKajian({ token }) {
    const [kajianList, setKajianList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC');
    const router = useRouter();
    const totalPages = Math.ceil(totalItems / pageSize);


    // fetch data kajian
    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/kajian?page=${page}&limit=${pageSize}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();

        // handle if token expired
        if (data.message === 'Token tidak valid') {
            toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
            setTimeout(() => {
                signOut({ callbackUrl: '/admin/login' });
            }, 3000);
        }
        // handle if token expired

        if (!res.ok) {
            toast.error('Gagal mengambil data kajian');
            setLoading(false);
            return;
        }
        setKajianList(data.data);
        setTotalItems(data.total);
        setLoading(false);
    };

    // sort kajian table
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(field);
            setSortOrder('ASC');
        }
        setPage(1); // reset ke halaman 1 saat sorting berubah
    }

    // handle search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1); // reset ke halaman 1 saat search berubah
    }

    // handle delete kajian
    async function handleDelete(id) {
        const konfirmasi = confirm("Yakin ingin menghapus kajian ini?");
        if (!konfirmasi) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/kajian/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                toast.success('Kajian berhasil dihapus');
                fetchData();
            } else {
                toast.error('Gagal menghapus kajian');
            }
        } catch (error) {
            console.error(error);
            toast.error('Terjadi kesalahan saat menghapus kajian');
        }
    }

    // handle edit kajian
    const handleEdit = (id) => {
        router.push(`/admin/kajian/${id}`);
    }


    /**
 * Hook useEffect untuk mengambil data setiap kali dependensi berubah.
 * 
 * Efek ini akan dipicu setiap kali state `page`, `pageSize`, `searchQuery`, 
 * `sortBy`, atau `sortOrder` berubah. Fungsi ini memanggil `fetchData` 
 * untuk mengambil daftar data kajian terbaru dari API.
 * 
 * Dependensi:
 * - `page`: Nomor halaman saat ini untuk paginasi.
 * - `pageSize`: Jumlah item per halaman.
 * - `searchQuery`: String pencarian untuk memfilter hasil.
 * - `sortBy`: Field yang digunakan untuk pengurutan data.
 * - `sortOrder`: Urutan pengurutan (misalnya, 'ASC' atau 'DESC').
 */
    useEffect(() => {
        fetchData();
    }, [page, pageSize, searchQuery, sortBy, sortOrder]);


    return (
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto ">
            <Link href="/admin/ustadz/tambah">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
                    + Tambah Kajian
                </button>
            </Link>

            {/* filter */}
            <div className="flex justify-between mb-4 items-center">
                <input
                    type="text"
                    placeholder="Cari Judul kajian..."
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
                            <th className="p-2 border" onClick={() => handleSort('judul')}>
                                Judul
                                {sortBy === 'judul' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                            </th>
                            <th className="p-2 border">Banner</th>
                            <th className="p-2 border">Tanggal Waktu</th>
                            <th className="p-2 border">Lokasi</th>
                            <th className="p-2 border">Link Lokasi</th>
                            <th className="p-2 border">Materi</th>
                            <th className="p-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kajianList && kajianList.length > 0 ? (
                            kajianList.map((kajian) => (
                                <tr key={kajian.id}>
                                    <td className="p-2 border">{kajian.judul}</td>
                                    <td className="p-2 border">
                                        {kajian.banner ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_BASE}/${kajian.banner}`}
                                                alt={kajian.judul}
                                                width={500}
                                                height={500}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span>Tidak ada foto</span>
                                        )}
                                    </td>
                                    <td className="p-2 border">
                                        {new Date(kajian.tanggal_waktu).toLocaleString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </td>
                                    <td className="p-2 border">{kajian.lokasi}</td>
                                    <td className="p-2 border">
                                        {kajian.link_lokasi ? (
                                            <a
                                                href={kajian.link_lokasi}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-blue-100 text-blue-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"
                                            >
                                                {kajian.judul}
                                            </a>
                                        ) : (
                                            <span>Tidak ada link</span>
                                        )}
                                    </td>
                                    <td className="p-2 border space-x-2">
                                        {kajian.materi}
                                    </td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => router.push(`/admin/kajian/edit/${kajian.id}`)}
                                            className="text-blue-600 hover:underline">Edit</button>
                                        <button
                                            onClick={() => handleDelete(kajian.id)}
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
    )


}