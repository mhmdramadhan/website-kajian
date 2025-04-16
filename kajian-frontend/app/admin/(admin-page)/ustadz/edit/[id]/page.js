import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormEditUstadz from "@/components/FormUstadzEdit";

export default async function EditUstadzPage({ params }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz/${params.id}`, {
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        redirect("/admin/ustadz"); // jika data tidak ditemukan
    }

    const ustadz = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Ustadz</h1>
            <FormEditUstadz ustadz={ustadz} token={session.user.token} />
        </div>
    );
}
