// app/admin/(admin)/ustadz/tambah/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormKajian from "@/components/FormKajian";

// meta data
export const metadata = {
    title: "Tambah Kajian",
    description: "Tambah Kajian",
};

export default async function TambahKajianPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    // get ustadz list
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz`;

    const res = await fetch(`${url}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    const ustadzList = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tambah Kajian</h1>
            <FormKajian token={session.user.token} ustadzList={ustadzList} session={session} />
        </div>
    );
}
