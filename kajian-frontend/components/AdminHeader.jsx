'use client'
// import { logout } from '@/utils/logout'; // nanti kita bikin
import { signOut } from "next-auth/react";

export default function AdminHeader() {

    function logout() {
        signOut({ callbackUrl: '/admin/login' });
    }

    return (
        <header className="h-16 bg-white shadow px-6 flex items-center justify-between fixed left-64 right-0 top-0 z-10">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button onClick={logout} className="text-red-600 font-medium hover:underline">
                Logout
            </button>
        </header>
    );
}
