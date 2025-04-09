'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/kajian', label: 'Kajian' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/profile', label: 'Profile' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4 fixed">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded hover:bg-gray-700 ${pathname === link.href ? 'bg-gray-700' : ''
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </aside>
    );
}
