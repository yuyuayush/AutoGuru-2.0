"use client";

import { useHomeServices } from "@/hooks/useHomeService";
import { Loader2, Eye, Edit } from "lucide-react";
import { format } from "date-fns";

export default function RecentBookingsTable() {
    const { data: bookings, isLoading, error } = useHomeServices();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-[#111] rounded-lg border border-gray-800">
                <Loader2 className="w-8 h-8 animate-spin text-[#c4912c]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-white rounded-lg border border-gray-100 text-center text-red-500">
                Failed to load bookings
            </div>
        );
    }

    // Take only the last 5 bookings for the dashboard
    // Take only the last 5 bookings for the dashboard
    const bookingsList = Array.isArray(bookings) ? bookings : (bookings?.bookings || bookings?.data || []);
    const recentBookings = bookingsList.slice(0, 5);

    return (
        <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
                <button className="text-sm text-[#c4912c] hover:text-[#d4a03c] font-medium transition-colors">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900/50 text-gray-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Service</th>
                            <th className="px-6 py-4 font-medium">Vehicle</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {recentBookings.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            recentBookings.map((booking: any) => (
                                <tr key={booking._id} className="hover:bg-gray-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{booking.name}</div>
                                        <div className="text-xs text-gray-500">{booking.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {booking.serviceType}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {booking.vehicleName} {booking.vehicleModel}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {booking.createdAt ? format(new Date(booking.createdAt), 'MMM d, yyyy') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' :
                                                'bg-gray-800 text-gray-400 border border-gray-700'
                                            }`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-1 text-gray-500 hover:text-[#c4912c] transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-white transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
