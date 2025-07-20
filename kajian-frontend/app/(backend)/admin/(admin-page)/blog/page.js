import TableBlog from "@/components/TableBlog";
import { requireSession } from "@/lib/checkSession";

export const metadata = {
    title: "Blog",
    description: "Manajemen Blog Ustadz",
};

export default async function Page() {
    const session = await requireSession();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manajemen Blog</h1>
            <TableBlog session={session} />
        </div>
    )

}