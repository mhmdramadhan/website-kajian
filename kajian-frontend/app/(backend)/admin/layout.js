// app/admin/layout.js
// import { AuthProvider } from "@/context/AuthContext";
import './admin.css'

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
