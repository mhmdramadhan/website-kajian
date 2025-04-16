// app/admin/(admin)/ustadz/tambah/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormUstadz from "@/components/FormUstadz";

export default async function TambahUstadzPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tambah Ustadz</h1>
            <FormUstadz token={session.user.token} />
        </div>
    );
}
