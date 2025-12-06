"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, User, Car, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const MOCK_BOOKING_DETAILS = {
    _id: "BK-7829",
    userId: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0412 345 678"
    },
    vehicleId: {
        make: "Toyota",
        model: "Corolla",
        year: 2015
    },
    serviceType: "Logbook Service",
    price: "250",
    date: "Dec 12, 2025",
    time: "10:00 AM",
    location: "123 Main St, Sydney NSW 2000",
    status: "Pending",
    notes: "Please check the brakes as well."
};

export default function SupplierBookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.id as string;

    // Simulate fetching data
    const booking = MOCK_BOOKING_DETAILS;

    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <h2 className="text-2xl font-bold text-gray-900">Booking not found</h2>
                <button
                    onClick={() => router.back()}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Confirmed": return "bg-green-100 text-green-800 border-green-200";
            case "Completed": return "bg-blue-100 text-blue-800 border-blue-200";
            case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Pending": return <AlertCircle className="w-4 h-4" />;
            case "Confirmed": return <CheckCircle className="w-4 h-4" />;
            case "Completed": return <CheckCircle className="w-4 h-4" />;
            case "Cancelled": return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Bookings
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
                    <p className="text-gray-500 mt-1">ID: #{booking._id}</p>
                </div>
                <div className={cn(
                    "px-4 py-2 rounded-full border flex items-center gap-2 font-medium",
                    getStatusColor(booking.status)
                )}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Details Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                Service Information
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Service Type</label>
                                <p className="text-lg font-medium text-gray-900 mt-1">{booking.serviceType}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Price</label>
                                <p className="text-lg font-medium text-gray-900 mt-1">${booking.price}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Date</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-gray-900">{booking.date}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Time</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <p className="text-gray-900">{booking.time}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <div className="flex items-start gap-2 mt-1">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <p className="text-gray-900">{booking.location}</p>
                                </div>
                            </div>
                            {booking.notes && (
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-500">Customer Notes</label>
                                    <div className="bg-gray-50 p-4 rounded-lg mt-2 text-gray-700 border border-gray-100">
                                        {booking.notes}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Vehicle Details Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Car className="w-5 h-5 text-gray-500" />
                                Vehicle Details
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Make</label>
                                    <p className="text-gray-900 mt-1">{booking.vehicleId.make}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Model</label>
                                    <p className="text-gray-900 mt-1">{booking.vehicleId.model}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Year</label>
                                    <p className="text-gray-900 mt-1">{booking.vehicleId.year}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Customer Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-500" />
                                Customer Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                    {booking.userId.firstName[0]}{booking.userId.lastName[0]}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-lg">
                                        {booking.userId.firstName} {booking.userId.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500">Customer</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                                    <p className="text-gray-900 mt-1 break-all">{booking.userId.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
                                    <p className="text-gray-900 mt-1">{booking.userId.phone}</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    Contact Customer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
