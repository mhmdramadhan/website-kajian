'use client';

import { signOut } from 'next-auth/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardUstadz({ ustadzData }) {

    useEffect(() => {
        if (adminData?.message === 'Token tidak valid') {
            toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
            setTimeout(() => {
                signOut({ callbackUrl: '/admin/login' });
            }, 3000);
        }
    }, [adminData]);

    if (!ustadzData) {
        return <div className="text-center text-gray-500">Memuat data dashboard...</div>;
    }

    if (adminData?.message === 'Token tidak valid') {
        // Tampilkan placeholder sementara
        return <div className="text-center text-red-500">Sesi tidak valid. Mengarahkan ke halaman login...</div>;
    }

    if (ustadzData?.message === 'Token tidak valid') {
        setTimeout(() => {
            signOut({ callbackUrl: '/admin/login' });
        }, 3000);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Assalamu’alaikum, {ustadzData.nama}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard title="Jumlah Kajian Saya" value={ustadzData.jumlahKajian} />
                <StatCard title="Jumlah Blog Saya" value={ustadzData.jumlahBlog} />
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Kajian Terdekat Saya</h2>
                <ul className="list-disc ml-6">
                    {ustadzData.kajianTerdekat.map((kajian, i) => (
                        <li key={i}>{kajian.judul} - {new Date(kajian.tanggal_waktu).toLocaleString()}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Blog Saya Terbaru</h2>
                <ul className="list-disc ml-6">
                    {ustadzData.blogTerbaru.map((blog, i) => (
                        <li key={i}>{blog.judul}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
    );
}