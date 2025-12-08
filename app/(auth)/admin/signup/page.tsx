"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2, ShieldCheck } from 'lucide-react';

const AdminSignupPage = () => {
    const { adminSignupMutation } = useAdmin();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        setupSecret: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { setupSecret, ...data } = formData;
        adminSignupMutation.mutate({ data, secret: setupSecret });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <ShieldCheck className="w-12 h-12 text-[#bf953f]" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create Admin Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Or{' '}
                    <Link href="/auth/admin/login" className="font-medium text-[#bf953f] hover:text-[#aa8433]">
                        sign in to existing account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#111] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-500 bg-black text-white focus:outline-none focus:ring-[#bf953f] focus:border-[#bf953f] sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-500 bg-black text-white focus:outline-none focus:ring-[#bf953f] focus:border-[#bf953f] sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-500 bg-black text-white focus:outline-none focus:ring-[#bf953f] focus:border-[#bf953f] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-500 bg-black text-white focus:outline-none focus:ring-[#bf953f] focus:border-[#bf953f] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="setupSecret" className="block text-sm font-medium text-gray-300">
                                Admin Setup Key <span className="text-gray-500 text-xs">(Required for first admin)</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    id="setupSecret"
                                    name="setupSecret"
                                    type="password"
                                    value={formData.setupSecret}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-gray-500 bg-black text-white focus:outline-none focus:ring-[#bf953f] focus:border-[#bf953f] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={adminSignupMutation.isPending}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#bf953f] to-[#aa8433] hover:shadow-[0_0_20px_rgba(191,149,63,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bf953f] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {adminSignupMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Admin Account'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSignupPage;
