export async function fetchWithAuthServer(url, token) {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return;
    }

    return res.json();
}
