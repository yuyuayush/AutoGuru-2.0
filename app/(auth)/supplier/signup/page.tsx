"use client";

import React from "react";
import Link from "next/link";
import SupplierRegisterForm from "@/components/form/SupplierRegisterForm";
import Logo from "@/components/homepage/Logo";

const SupplierSignupPage = () => {
    return (
        <div className="min-h-screen flex bg-black">

            {/* LEFT SIDE — BRANDING */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20">
                
                <h2 className="text-4xl font-extrabold text-white">
                    GROW YOUR WORKSHOP WITH
                    <br />
                    <span className="text-amber-400">AUTOGURU</span>
                </h2>

                <p className="mt-6 text-gray-300 max-w-md leading-relaxed">
                    Join Australia's largest network of high-quality mechanics.  
                    Get more bookings, manage your schedule, and grow your business.
                </p>

                <div className="mt-10 space-y-5">

                    {/* BULLET POINT 1 */}
                    <div className="flex items-center gap-4">
                        <div className="text-amber-400 text-lg">◇</div>
                        <span className="text-gray-300">
                            Guaranteed bookings, not just leads
                        </span>
                    </div>

                    {/* BULLET POINT 2 */}
                    <div className="flex items-center gap-4">
                        <div className="text-amber-400 text-lg">◇</div>
                        <span className="text-gray-300">
                            Fast payments for completed work
                        </span>
                    </div>

                    {/* BULLET POINT 3 */}
                    <div className="flex items-center gap-4">
                        <div className="text-amber-400 text-lg">◇</div>
                        <span className="text-gray-300">
                            Dedicated support team
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE — BUSINESS PORTAL */}
            <div className="flex-1 flex justify-center items-center px-8 lg:px-20 relative">

                {/* CARD BACKGROUND GLOW */}
                <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-black via-amber-900/5 to-transparent pointer-events-none" />

                <div className="w-full max-w-md z-10">

                    {/* TITLE */}
                    <h2 className="text-center text-3xl font-extrabold text-white">
                        BUSINESS PORTAL
                    </h2>

                    <p className="text-center mt-2 text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/supplier/login"
                            className="text-blue-400 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* PREMIUM CARD */}
                    <div className="
                        mt-8 rounded-xl border border-amber-700/40
                        bg-black/40 backdrop-blur-md
                        shadow-[0_0_25px_rgba(255,200,0,0.15)]
                        p-10
                    ">
                        <p className="text-gray-300 text-center mb-6">
                            Login or Create an account to register as a supplier.
                        </p>

                        {/* LOGIN BUTTON */}
                        <Link
                            href="/supplier/login"
                            className="
                                block w-full text-center py-2 rounded-md
                                border border-gray-600 text-gray-300
                                hover:bg-gray-800 transition
                            "
                        >
                            Login
                        </Link>

                        {/* CREATE ACCOUNT BUTTON */}
                        <Link
                            href="/supplier/signup"
                            className="
                                mt-4 block w-full text-center py-2 rounded-md
                                bg-gradient-to-b from-amber-500 to-amber-700
                                text-white font-semibold
                                hover:from-amber-400 hover:to-amber-600
                                transition
                            "
                        >
                            Create Account
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SupplierSignupPage;
