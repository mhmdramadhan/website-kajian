import DashboardAdmin from "@/components/DashboardAdmin";
import DashboardUstadz from "@/components/DashboardUstadz";
import { requireSession } from "@/lib/checkSession";
import { fetchWithAuthServer } from "@/lib/fetchWithAuthServer";

// meta data
export const metadata = {
    title: "Dashboard",
    description: "Dashboard Admin",
};

export default async function DashboardPage() {
    const session = await requireSession();
    console.log(session);
    
    const { role, token, ustadzId } = session.user;

    let data;

    if (role === "admin") {
        data = await fetchWithAuthServer(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/admin-overview`, token);
        return (
            <div className="p-4">
                <DashboardAdmin adminData={data} />
            </div>
        );
    }

    if (role === "ustadz") {
        data = await fetchWithAuthServer(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/ustadz-overview/${ustadzId}`, token);
        return (
            <div className="p-4">
                <DashboardUstadz ustadzData={data} />
            </div>
        );
    }

    // optional fallback
    return null;
}
