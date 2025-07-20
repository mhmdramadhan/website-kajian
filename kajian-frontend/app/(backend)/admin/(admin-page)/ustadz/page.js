import TableUstadz from "@/components/TableUstadz";
import { requireSession } from "@/lib/checkSession";

// meta data
export const metadata = {
    title: "Ustadz",
    description: "Manajemen Ustadz",
};

export default async function UstadzPage() {
    const session = await requireSession();


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Ustadz</h1>
            <TableUstadz session={session} />
        </div>
    );
}
