import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    const url = request.nextUrl.clone();

    // Cek halaman yang butuh proteksi
    const protectedPaths = ['/admin/dashboard', '/admin/kajian', '/admin/blog', '/admin/profile'];
    const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

    if (isProtected && !token) {
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
    }

    // Jika login page tapi sudah login, redirect ke dashboard
    if (url.pathname === '/admin/login' && token) {
        url.pathname = '/admin/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
