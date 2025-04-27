'use client'
import { useRouter } from "next/navigation";

export default function AdminHeader() {

    const router = useRouter();

    return (
        <header className="h-16 bg-white shadow px-6 flex items-center justify-between fixed left-64 right-0 top-0 z-10">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button onClick={() => router.push("/admin/logout/confirm")} className="text-red-600 font-medium hover:underline">
                Logout
            </button>
        </header>
    );
}
