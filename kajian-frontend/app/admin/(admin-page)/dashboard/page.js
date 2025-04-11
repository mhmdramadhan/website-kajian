// app/admin/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import api from '@/utils/api';
import DashboardAdmin from "@/components/DashboardAdmin";
import DashboardUstadz from "@/components/DashboardUstadz";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    let adminData = null;
    let ustadzData = null;

    try {
        if (session.user.role === 'admin') {
            const res = await api.get('/dashboard/admin-overview', {
                headers: { Authorization: `Bearer ${session.user.token}` }
            });
            // console.log("Admin data:", res.data); 
            adminData = res.data;

        } else if (session.user.role === 'ustadz') {
            const res = await api.get(`/dashboard/ustadz-overview/${session.user.ustadzId}`, {
                headers: { Authorization: `Bearer ${session.user.token}` }
            });
            ustadzData = res.data;
        }
    } catch (err) {
        console.error('Gagal mengambil data dashboards:', err);
    }

    return (
        <div className="p-4">
            {session.user.role === 'admin' && adminData && (
                <DashboardAdmin adminData={adminData} />
            )}

            {session.user.role === 'ustadz' && ustadzData && (
                <DashboardUstadz ustadzData={ustadzData} />
            )}
        </div>
    );
}
