"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            if (!isAuthenticated || user?.role !== 'admin') {
                router.replace("/admin/login");
            }
        }
    }, [isClient, isAuthenticated, user, router]);

    if (!isClient) return null;

    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#bf953f]" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black text-white" style={{
            // @ts-ignore
            '--table-bg': '#111111',
            '--table-header-bg': '#18181b', // zinc-900
            '--table-border': '#27272a', // zinc-800
            '--table-text-header': '#9ca3af', // gray-400
            '--table-text-cell': '#e5e7eb', // gray-200
            '--table-row-hover': '#27272a', // zinc-800
            '--table-input-bg': '#18181b',
            '--modal-bg': '#111111',
            '--modal-border': '#27272a', // zinc-800
            '--modal-text-title': '#ffffff',
            '--modal-close-icon': '#9ca3af', // gray-400
            '--modal-close-hover-bg': '#27272a', // zinc-800
        } as React.CSSProperties}>
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
