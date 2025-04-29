import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TableUstadz from "@/components/TableUstadz";

// meta data
export const metadata = {
    title: "Ustadz",
    description: "Manajemen Ustadz",
};

export default async function UstadzPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Ustadz</h1>
            <TableUstadz session={session} />
        </div>
    );
}
