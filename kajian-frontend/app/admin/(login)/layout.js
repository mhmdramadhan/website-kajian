import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader />
                <main className="mt-16 p-6">{children}</main>
            </div>
        </div>
    );
}
