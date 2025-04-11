'use client';

import { getSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import api from '@/utils/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardUstadz() {
    const [ustadzData, getUstadzData] = useState(null);

    // ambil data
    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            if (!session) return;

            try {
                const res = await api.get(`/dashboard/ustadz-overview/${session.user.ustadzId}`, {
                    headers: { Authorization: `Bearer ${session.user.token}` }
                });
                getUstadzData(res.data);
            } catch (err) {
                console.error('Gagal mengambil data dashboard:', err.response?.data.message);

                console.log('Gagal mengambil data dashboard:', err?.response?.data?.message);

                if (err?.response?.data?.message === 'Token tidak valid') {
                    toast.error('Sesi login kamu sudah habis. Silakan login ulang.');
                    setTimeout(() => {
                        signOut({ callbackUrl: '/admin/login' });
                    }, 2000);
                }
            }
        };

        fetchData();
    }, [])

    if (!ustadzData) {
        return <div>Loading...</div>;
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