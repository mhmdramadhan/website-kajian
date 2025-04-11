import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // file konfigurasi NextAuth kamu
import { redirect } from "next/navigation";
import AuthForm from "@/components/ AuthForm";
import '../../admin.css';

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        // Jika sudah login, redirect ke halaman admin
        redirect("/admin/dashboard");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm />
        </div>
    );
}
