// app/admin/layout.js
import { AuthProvider } from "@/context/AuthContext";
import './admin.css'

export default function AdminLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
