import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // file konfigurasi NextAuth kamu
import { redirect } from "next/navigation";
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader />
                <main className="mt-16 p-6">{children}</main>
            </div>
        </div>
    );
}

