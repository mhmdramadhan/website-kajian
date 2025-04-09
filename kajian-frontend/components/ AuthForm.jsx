'use client';
import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";

export default function AuthForm() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(form);
            
            await login(form.email, form.password);
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
