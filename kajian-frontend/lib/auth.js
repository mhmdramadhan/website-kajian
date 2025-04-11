// lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // console.log("Received credentials:", credentials);
                // Panggil API login kamu
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                        credentials: "include", // penting jika pakai cookie
                    });

                    const data = await res.json();

                    // console.log("Response data:", data);

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
                } catch (error) {
                    console.error("Gagal authorize:", error);
                    return null;
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.token = user.token;
                token.ustadzId = user.ustadzId;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.token = token.token;
            session.user.ustadzId = token.ustadzId;
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
};
