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
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardAdmin() {
    const [adminData, setAdminData] = useState(null);

    // ambil data
    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            try {
                const res = await api.get('/dashboard/admin-overview', {
                    headers: { Authorization: `Bearer ${session?.user?.token}` }
                });
                setAdminData(res.data);
            } catch (err) {
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
    }, []);

    if (!adminData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Halo Aadmin!</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Kajian" value={adminData.totalKajian} />
                <StatCard title="Total Blog" value={adminData.totalBlog} />
                <StatCard title="Total Ustadz" value={adminData.totalUstadz} />
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Grafik Kajian per Ustadz</h2>
                <div className="bg-gray-200 p-4 rounded">
                    <Bar
                        data={{
                            labels: adminData.chartKajianPerUstadz.map(item => item.nama),
                            datasets: [
                                {
                                    label: 'Jumlah Kajian',
                                    data: adminData.chartKajianPerUstadz.map(item => item.jumlahKajian),
                                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Kajian per Ustadz',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Grafik Blog per Ustadz</h2>
                <div className="bg-gray-200 p-4 rounded">
                    <Bar
                        data={{
                            labels: adminData.chartBlogPerUstadz.map(item => item.nama),
                            datasets: [
                                {
                                    label: 'Jumlah Blog',
                                    data: adminData.chartBlogPerUstadz.map(item => item.jumlahBlog),
                                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Blog per Ustadz',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Top 3 Ustadz dengan Kajian Terbanyak</h2>
                <ul className="list-disc ml-6">
                    {adminData.topUstadz.map((ustadz, i) => (
                        <li key={i}>{ustadz.nama} - {ustadz.totalKajian} Kajian</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">5 Kajian Terdekat</h2>
                <ul className="list-disc ml-6">
                    {adminData.kajianTerdekat.map((kajian, i) => (
                        <li key={i}>{kajian.judul} - {new Date(kajian.tanggal_waktu).toLocaleString()}</li>
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