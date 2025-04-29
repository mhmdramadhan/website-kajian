import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormEditUstadz from "@/components/FormUstadzEdit";
import FormKajianEdit from "@/components/FormKajianEdit";

// meta data
export const metadata = {
    title: "Edit Kajian",
    description: "Edit Kajian",
};

export default async function EditUstadzPage({ params }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/kajian/${id}`, {
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        redirect("/admin/kajian"); // jika data tidak ditemukan
    }
    const kajian = await res.json();

    // get ustadz list
    const resUstadz = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });
    const ustadzList = await resUstadz.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Ustadz</h1>
            <FormKajianEdit kajian={kajian} session={session} ustadzList={ustadzList} />
        </div>
    );
}
