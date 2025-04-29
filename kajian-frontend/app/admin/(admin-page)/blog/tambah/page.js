// app/admin/(admin)/ustadz/tambah/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormBlog from "@/components/FormBlog";

// meta data
export const metadata = {
    title: "Tambah Blog",
    description: "Tambah Blog",
};

export default async function TambahBlogPage() {
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
            <h1 className="text-2xl font-bold mb-4">Tambah Blog</h1>
            <FormBlog token={session.user.token} ustadzList={ustadzList} session={session} />
        </div>
    );
}
