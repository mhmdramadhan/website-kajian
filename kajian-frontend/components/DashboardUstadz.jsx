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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardUstadz({ ustadzData }) {
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