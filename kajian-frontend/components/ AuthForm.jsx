'use client';

import { useState } from 'react';
// import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: form.email, // harus sama dengan `credentials.email`
                password: form.password, // harus sama dengan `credentials.password`
                callbackUrl: "/admin/dashboard",
            });

            if (res.ok) {
                console.log(res);
                router.push("/admin/dashboard");
            } else {
                setError("Login gagal: email atau password salah");
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Login gagal");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded-xl shadow">
            <h1 className="text-xl font-bold mb-4">Login Admin</h1>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <input type="email" name="email" placeholder="Email" onChange={handleChange}
                className="w-full p-2 mb-3 border rounded" value={form.email} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange}
                className="w-full p-2 mb-3 border rounded" value={form.password} required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
                Login
            </button>
        </form>
    );
}
