// context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // menyimpan data user yang login
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const res = await api.get("/api/auth/me", { withCredentials: true });
            setUser(res.data);
        } catch (err) {
            setUser(null);

            // Tambahan: Logout otomatis jika token tidak valid
            if (err.response?.status === 401 || err.response?.status === 403) {
                await logout(); // logout akan redirect ke /admin/login
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        await api.post("/api/auth/login", { email, password }, { withCredentials: true });
        await fetchUser();
        router.push("/admin/dashboard");
    };

    const logout = async () => {
        await api.post("/api/auth/logout", {}, { withCredentials: true });
        setUser(null);
        router.push("/admin/login");
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
