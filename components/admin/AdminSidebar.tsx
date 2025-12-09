"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Wrench,
    Calendar,
    FileText,
    Settings,
    Car,
    LogOut,
    MessageSquare,
    Star,
    FilePlus,
    Building2,
    User
} from "lucide-react";
import Logo from "../homepage/Logo";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Bookings",
        href: "/admin/bookings",
        icon: Calendar
    },
    {
        title: "Vehicles",
        href: "/admin/vehicles",
        icon: Car
    },
    {
        title: "Services",
        href: "/admin/services",
        icon: Wrench
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: User
    },
    {
        title: "Quotes",
        href: "/admin/quotes",
        icon: FileText
    },
    {
        title: "Inquiries",
        href: "/admin/inquiries",
        icon: MessageSquare
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star
    },
    {
        title: "Service Requests",
        href: "/admin/service-requests",
        icon: FilePlus
    },
    {
        title: "B2B Proposals",
        href: "/admin/b2b-proposals",
        icon: Building2
    },
    {
        title: "Profile",
        href: "/admin/profile",
        icon: User
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-black border-r border-gray-800 text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <Link href="/">
                    <Logo color="white" />
                </Link>
                <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Admin Panel
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? "bg-gold-gradient text-white shadow-lg shadow-yellow-900/20 font-semibold"
                                : "text-gray-400 hover:bg-gray-900 hover:text-white"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
                            <span className="">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <Link href="/admin/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-900 rounded-xl transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gold-500 border border-gray-700">
                        <span className="text-xs font-bold text-[#c4912c]">AD</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-200 group-hover:text-white">Admin User</p>
                        <p className="text-xs text-gray-600">admin@autoguru.com</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
