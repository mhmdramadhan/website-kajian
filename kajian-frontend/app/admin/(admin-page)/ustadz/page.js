// /app/admin/(admin)/ustadz/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TableUstadz from "@/components/TableUstadz";

export default async function UstadzPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    // console.log(res.status);
    const ustadzList = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Ustadz</h1>
            <TableUstadz ustadzList={ustadzList} token={session.user.token} />
        </div>
    );
}
