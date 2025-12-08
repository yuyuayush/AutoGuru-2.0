"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/homepage/Logo";

const SupplierLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/supplier/dashboard");
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div>
                <label className="block text-sm font-medium text-gray-300">
                    Email address
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        mt-1 w-full px-3 py-2 rounded-md
                        bg-[#111] text-gray-200 placeholder-gray-500
                        border border-gray-700
                        focus:outline-none focus:ring-amber-400 focus:border-amber-400
                    "
                />
            </div>

            {/* PASSWORD */}
            <div>
                <label className="block text-sm font-medium text-gray-300">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        mt-1 w-full px-3 py-2 rounded-md
                        bg-[#111] text-gray-200 placeholder-gray-500
                        border border-gray-700
                        focus:outline-none focus:ring-amber-400 focus:border-amber-400
                    "
                />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-white text-sm">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 bg-gray-800 border-gray-700 rounded"
                    />
                    Remember me
                </label>

                <a className="text-blue-400 text-sm hover:text-blue-300">
                    Forgot your password?
                </a>
            </div>

            {/* SIGN IN BUTTON — GOLD STYLE */}
            <button
                type="submit"
                className="
                    w-full py-2 text-center rounded-md text-white font-semibold
                    bg-gradient-to-b from-amber-500 to-amber-700
                    hover:from-amber-400 hover:to-amber-600
                    transition shadow-md
                "
            >
                Sign in
            </button>

            {/* DIVIDER */}
            <div className="flex items-center my-6">
                <div className="grow border-t border-gray-700"></div>
                <span className="mx-3 text-gray-400 text-sm">Not a member?</span>
                <div className="grow border-t border-gray-700"></div>
            </div>

            {/* JOIN BUTTON */}
            <Link
                href="/supplierLanding"
                className="
                    w-full block text-center py-2 rounded-md text-gray-200
                    border border-gray-700 bg-[#1b1b1b]
                    hover:bg-[#222] transition
                "
            >
                Join the network
            </Link>

        </form>
    );
};

export default SupplierLoginForm;
