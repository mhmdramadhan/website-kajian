// app/admin/dashboard/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardAdmin from "@/components/DashboardAdmin";
import DashboardUstadz from "@/components/DashboardUstadz";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");
    
    if (session.user.role == 'admin') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/admin-overview`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();

        // console.log(data);

        return (
            <div className="p-4">
                <DashboardAdmin adminData={data} />

            </div>
        );
    }

    if (session.user.role == 'ustadz') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/ustadz-overview/${session.user.ustadzId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.token}`,
            },
            cache: "no-store",
        });

        const data = await res.json();

        return (
            <div className="p-4">
                <DashboardUstadz ustadzData={data} />
            </div>
        );
    }









}
