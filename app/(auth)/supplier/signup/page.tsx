
"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/components/homepage/Logo";
import SupplierRegisterForm from "@/components/form/SupplierRegisterForm";

const SupplierSignupPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Left Side - Hero/Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-gray-900/40 z-10" />
                {/* You can add a background image here if available */}
                {/* <Image src="/supplier-hero.jpg" layout="fill" objectFit="cover" className="absolute inset-0" /> */}

                <div className="relative z-20 flex flex-col justify-center px-12 text-white">
                    <div className="mb-8">
                        <Logo color="white" />
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6">
                        Grow your workshop with AutoGuru
                    </h1>
                    <p className="text-xl text-gray-300 max-w-md">
                        Join Australia's largest network of high-quality mechanics. Get more bookings, manage your schedule, and grow your business.
                    </p>

                    <div className="mt-12 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Guaranteed bookings, not just leads</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Fast payments for completed work</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Dedicated support team</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2 bg-gray-900">
                <div className="mx-auto w-full max-w-md">
                    <div className="lg:hidden flex justify-center mb-8">
                        <Logo color="white" />
                    </div>

                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-extrabold text-white">
                            Create a Supplier Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href="/supplier/login" className="font-medium text-blue-400 hover:text-blue-300">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-700">
                        <SupplierRegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierSignupPage;
