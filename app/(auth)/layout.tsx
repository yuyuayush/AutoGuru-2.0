"use client";

import { usePathname } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    const customer = pathname === "/login" || pathname === "/signup";

    return (
        <div className={`${customer ? "bg-gray-50" : "bg-gray-900"} min-h-screen`}>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
