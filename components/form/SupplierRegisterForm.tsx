"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMechanic } from "@/hooks/useMechanic";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

// Define Zod schema
const supplierSignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    businessName: z.string().min(1, "Business name is required"),
    postcode: z.string().min(1, "Postcode is required"),
    interests: z.object({
        marketplace: z.boolean(),
        directBookings: z.boolean(),
        fleetBookings: z.boolean(),
        reserveWithGoogle: z.boolean(),
        bnpl: z.boolean(),
        all: z.boolean(),
    }),
});

type SupplierSignupFormInputs = z.infer<typeof supplierSignupSchema>;

const SupplierRegisterForm = () => {
    const { registerMechanicMutation } = useMechanic();
    // const { isAuthenticated } = useAuthStore(); // Removed auth check

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SupplierSignupFormInputs>({
        resolver: zodResolver(supplierSignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            businessName: "",
            postcode: "",
            interests: {
                marketplace: false,
                directBookings: false,
                fleetBookings: false,
                reserveWithGoogle: false,
                bnpl: false,
                all: false,
            },
        },
    });

    const watchAll = watch("interests.all");

    // Handle "All of the above" logic
    React.useEffect(() => {
        if (watchAll) {
            setValue("interests.marketplace", true);
            setValue("interests.directBookings", true);
            setValue("interests.fleetBookings", true);
            setValue("interests.reserveWithGoogle", true);
            setValue("interests.bnpl", true);
        }
    }, [watchAll, setValue]);

    const onSubmit = (data: SupplierSignupFormInputs) => {
        // Split name into first and last name
        const nameParts = data.name.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "."; // Default last name if not provided

        // Collect interests
        const selectedInterests = [];
        if (data.interests.marketplace) selectedInterests.push("AutoGuru Marketplace Bookings");
        if (data.interests.directBookings) selectedInterests.push("BookingGuru Direct Bookings");
        if (data.interests.fleetBookings) selectedInterests.push("Fleet Bookings");
        if (data.interests.reserveWithGoogle) selectedInterests.push("Reserve with Google");
        if (data.interests.bnpl) selectedInterests.push("BNPL & Flexible Payments");

        registerMechanicMutation.mutate({
            firstName,
            lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            businessName: data.businessName,
            postcode: data.postcode,
            interests: selectedInterests,
        });
    }

    const inputClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 border-gray-600 text-white";
    const labelClasses = "block text-sm font-medium text-gray-300";
    const checkboxClasses = "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700";

    // if (!isAuthenticated) { ... } block removed

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {registerMechanicMutation.isError && (
                <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded text-sm">
                    {registerMechanicMutation.error?.message || "An error occurred. Please try again later."}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className={labelClasses}>Name*</label>
                    <div className="mt-1">
                        <input id="name" type="text" className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`} {...register("name")} />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="phoneNumber" className={labelClasses}>Phone number*</label>
                    <div className="mt-1">
                        <input id="phoneNumber" type="text" className={`${inputClasses} ${errors.phoneNumber ? 'border-red-500' : ''}`} {...register("phoneNumber")} />
                        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className={labelClasses}>Email*</label>
                    <div className="mt-1">
                        <input id="email" type="email" className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`} {...register("email")} />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className={labelClasses}>Password*</label>
                    <div className="mt-1">
                        <input id="password" type="password" className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`} {...register("password")} />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="businessName" className={labelClasses}>Business name*</label>
                    <div className="mt-1">
                        <input id="businessName" type="text" className={`${inputClasses} ${errors.businessName ? 'border-red-500' : ''}`} {...register("businessName")} />
                        {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="postcode" className={labelClasses}>Postcode*</label>
                    <div className="mt-1">
                        <input id="postcode" type="text" className={`${inputClasses} ${errors.postcode ? 'border-red-500' : ''}`} {...register("postcode")} />
                        {errors.postcode && <p className="mt-1 text-sm text-red-500">{errors.postcode.message}</p>}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Other</label>
                <select className={inputClasses}>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="block text-lg font-medium text-gray-300 mb-4">I'm interested in</label>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <input id="marketplace" type="checkbox" className={checkboxClasses} {...register("interests.marketplace")} />
                        <label htmlFor="marketplace" className="ml-3 text-sm text-gray-300">AutoGuru Marketplace Bookings</label>
                    </div>
                    <div className="flex items-center">
                        <input id="directBookings" type="checkbox" className={checkboxClasses} {...register("interests.directBookings")} />
                        <label htmlFor="directBookings" className="ml-3 text-sm text-gray-300">BookingGuru Direct Bookings</label>
                    </div>
                    <div className="flex items-center">
                        <input id="fleetBookings" type="checkbox" className={checkboxClasses} {...register("interests.fleetBookings")} />
                        <label htmlFor="fleetBookings" className="ml-3 text-sm text-gray-300">Fleet Bookings</label>
                    </div>
                    <div className="flex items-center">
                        <input id="reserveWithGoogle" type="checkbox" className={checkboxClasses} {...register("interests.reserveWithGoogle")} />
                        <label htmlFor="reserveWithGoogle" className="ml-3 text-sm text-gray-300">Reserve with Google</label>
                    </div>
                    <div className="flex items-center">
                        <input id="bnpl" type="checkbox" className={checkboxClasses} {...register("interests.bnpl")} />
                        <label htmlFor="bnpl" className="ml-3 text-sm text-gray-300">BNPL & Flexible Payments</label>
                    </div>
                    <div className="flex items-center">
                        <input id="all" type="checkbox" className={checkboxClasses} {...register("interests.all")} />
                        <label htmlFor="all" className="ml-3 text-sm text-gray-300">All of the above</label>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={registerMechanicMutation.isPending}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {registerMechanicMutation.isPending ? "Submitting..." : "Submit enquiry"}
                </button>
            </div>
        </form>
    );
};

export default SupplierRegisterForm;
