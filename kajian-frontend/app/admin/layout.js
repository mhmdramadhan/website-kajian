'use client';
// app/admin/layout.js
// import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'sonner';
import './admin.css'

export default function AdminLayout({ children }) {
    return (
        <>
            <Toaster position="top-center" />
            {children}
        </>
    );
}
