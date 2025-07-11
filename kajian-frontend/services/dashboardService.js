// services/dashboardService.js

export async function fetchAdminOverview(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/admin-overview`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch admin data");
    return res.json();
}

export async function fetchUstadzOverview(token, ustadzId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/dashboard/ustadz-overview/${ustadzId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ustadz data");
    return res.json();
}
