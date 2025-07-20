import TableKajian from "@/components/TableKajian";
import { requireSession } from "@/lib/checkSession";

// meta data
export const metadata = {
    title: "Kajian",
    description: "Manajemen Kajian Ustadz",
};

export default async function UstadzPage() {
    const session = await requireSession();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Kajian</h1>
            <TableKajian session={session} />
        </div>
    );
}
