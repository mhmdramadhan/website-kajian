import AuthForm from "@/components/ AuthForm";
import '../../admin.css';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm />
        </div>
    );
}
