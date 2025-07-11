// lib/services/authService.js

export async function loginWithCredentials(credentials) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include", // penting kalau backend pakai cookie
    });

    const data = await res.json();

    if (!res.ok || !data.user) {
        throw new Error(data.message || "Login gagal");
    }

    return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
        ustadzId: data.user.ustadzId || null,
    };
}
