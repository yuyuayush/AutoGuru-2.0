"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { LogOut, Bell, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminHeader() {
    const { logout, user } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        router.push("/admin/login");
    };

    return (
        <header className="bg-black/50 backdrop-blur-md border-b border-gray-800 h-16 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search bookings, mechanics, users..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#c4912c] focus:border-[#c4912c] transition-all text-sm placeholder:text-gray-600"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c4912c] rounded-full border-2 border-black"></span>
                </button>

                <div className="h-8 w-px bg-gray-800 mx-2"></div>

                <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-300 hidden md:block">
                        {user?.firstName || 'Admin'}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-950/30 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
