// lib/auth.js
import { loginWithCredentials } from "@/services/authService";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    return await loginWithCredentials(credentials);
                } catch (error) {
                    console.error("Gagal authorize:", error);
                    return null;
                }
            },
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
