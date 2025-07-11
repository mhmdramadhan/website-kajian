'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
                callbackUrl: "/admin/dashboard",
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError("Login gagal: email atau password salah");
            }
        } catch (err) {
            console.log(err);
            setError("Login gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded-xl shadow bg-white">
            <h1 className="text-xl font-bold mb-4">Login Admin</h1>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                value={form.email}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                value={form.password}
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Memproses...' : 'Login'}
            </button>
        </form>
    );
}
