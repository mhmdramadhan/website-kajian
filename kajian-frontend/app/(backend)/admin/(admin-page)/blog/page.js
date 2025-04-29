import TableBlog from "@/components/TableBlog";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Blog",
    description: "Manajemen Blog Ustadz",
};

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Blog</h1>
            <TableBlog session={session} />
        </div>
    )

}