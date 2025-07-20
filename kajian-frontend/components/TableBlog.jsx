'use client'

import { fetchWithAuthClient } from "@/lib/fetchWithAuthClient";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function TableBlog({ session }) {
    const [blogList, setBlogList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC');
    const router = useRouter();
    const totalPages = Math.ceil(totalItems / pageSize);
    const token = session.user.token;
    const role = session.user.role;
    const ustadzId = session.user.ustadzId;


    // fetch data kajian
    const fetchData = async () => {
        setLoading(true);
        try {
            const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/blog`;
            const params = new URLSearchParams({
                page,
                limit: pageSize,
                search: searchQuery,
                sortBy,
                sortOrder,
            });

            if (role === 'ustadz' && ustadzId) {
                params.append('ustadzId', ustadzId);
            }

            const data = await fetchWithAuthClient(`${baseUrl}?${params.toString()}`, token);

            if (!data) return;

            setBlogList(data.data);
            setTotalItems(data.total);
        } catch (error) {
            toast.error('Terjadi kesalahan saat mengambil data');
        } finally {
            setLoading(false);
        }
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
        const konfirmasi = confirm("Yakin ingin menghapus blog ini?");
        if (!konfirmasi) return;

        const success = await deleteWithAuth(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog/${id}`, token);
        if (success) {
            fetchData();
        }
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
        const getData = async () => {
            const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/blog`;
            const params = new URLSearchParams({ page, limit: pageSize, search: searchQuery, sortBy, sortOrder });

            const data = await fetchWithAuthClient(`${baseUrl}?${params.toString()}`, token);
            if (!data) return;

            setBlogList(data.data);
            setTotalItems(data.total);
        };

        getData();
    }, [page, pageSize, searchQuery, sortBy, sortOrder]);


    return (
        <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto ">
            <Link href="/admin/blog/tambah">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition">
                    + Tambah Blog
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
                            <th className="p-2 border">Ustadz</th>
                            <th className="p-2 border">Banner</th>
                            <th className="p-2 border">Isi</th>
                            <th className="p-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogList && blogList.length > 0 ? (
                            blogList.map((blog) => (
                                <tr key={blog.id}>
                                    <td className="p-2 border">{blog.judul}</td>
                                    <td className="p-2 border">
                                        {blog.ustadz ? (
                                            <Link
                                                href={`/admin/ustadz/${blog.ustadz.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {blog.ustadz.nama}
                                            </Link>
                                        ) : (
                                            <span>Tidak ada ustadz</span>
                                        )}
                                    </td>
                                    <td className="p-2 border">
                                        {blog.banner ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_BASE}/${blog.banner}`}
                                                alt={blog.judul}
                                                width={500}
                                                height={500}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span>Tidak ada foto</span>
                                        )}
                                    </td>
                                    <td className="p-2 border space-x-2">
                                        {blog.isi}
                                    </td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                                            className="text-blue-600 hover:underline">Edit</button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
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