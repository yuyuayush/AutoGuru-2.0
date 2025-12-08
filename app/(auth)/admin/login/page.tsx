"use client";

import React, { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const { adminLoginMutation } = useAdmin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        adminLoginMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="max-w-md w-full bg-[#111] rounded-lg shadow-lg p-8 border border-white/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage AutoGuru</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-md focus:ring-2 focus:ring-[#bf953f] focus:border-transparent text-white placeholder-gray-500"
                            placeholder="admin@autoguru.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-md focus:ring-2 focus:ring-[#bf953f] focus:border-transparent text-white placeholder-gray-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={adminLoginMutation.isPending}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#bf953f] to-[#aa8433] hover:shadow-[0_0_20px_rgba(191,149,63,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bf953f] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {adminLoginMutation.isPending ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
