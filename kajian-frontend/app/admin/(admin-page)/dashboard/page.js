// app/admin/dashboard/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardAdmin from "@/components/DashboardAdmin";
import DashboardUstadz from "@/components/DashboardUstadz";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    return (
        <div className="p-4">
            {session.user.role === 'admin' && (
                <DashboardAdmin />
            )}

            {session.user.role === 'ustadz' && (
                <DashboardUstadz />
            )}
        </div>
    );
}
