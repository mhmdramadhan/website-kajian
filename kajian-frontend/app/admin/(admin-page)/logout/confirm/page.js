"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutConfirmModal() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin/login" });
    };

    const handleCancel = () => {
        router.back(); // tutup modal
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Konfirmasi Logout</h2>
                <p className="mb-6">Apakah Anda yakin ingin logout?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={handleCancel} className="px-4 py-2 border rounded">
                        Batal
                    </button>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
