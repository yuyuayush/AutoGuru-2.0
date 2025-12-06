"use client";

import { useParams, useRouter } from "next/navigation";
import { useMechanicById, useMechanicBookings } from "@/hooks/useMechanic";
import { ArrowLeft, Mail, MapPin, Phone, Star, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/skeletons/Skeleton";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

export default function MechanicDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const { data: mechanicData, isLoading: isMechanicLoading } = useMechanicById(id);
    const { data: bookingsData, isLoading: isBookingsLoading } = useMechanicBookings(id);

    const mechanic = mechanicData?.data;
    const bookings = bookingsData?.data || [];

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "userId",
            header: "Customer",
            cell: ({ row }) => {
                const user = row.original.userId;
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            {user?.firstName?.[0] || <User className="w-4 h-4" />}
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">
                                {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
                            </div>
                            <div className="text-xs text-gray-500">{user?.email}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "serviceType",
            header: "Service",
            cell: ({ row }) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {row.getValue("serviceType")}
                </span>
            )
        },
        {
            accessorKey: "vehicle",
            header: "Vehicle",
            cell: ({ row }) => (
                <div className="text-sm text-gray-600">
                    {row.original.vehicleMake} {row.original.vehicleModel}
                </div>
            )
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {row.getValue("location")}
                </div>
            )
        },
        {
            accessorKey: "date",
            header: "Date & Time",
            cell: ({ row }) => (
                <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {row.getValue("date")}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {row.original.time}
                    </div>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                const colors = {
                    Pending: "bg-yellow-100 text-yellow-800",
                    Confirmed: "bg-blue-100 text-blue-800",
                    "In Progress": "bg-purple-100 text-purple-800",
                    Completed: "bg-green-100 text-green-800",
                    Cancelled: "bg-red-100 text-red-800"
                };
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                        {status}
                    </span>
                );
            }
        }
    ];

    if (isMechanicLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <TableSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    if (!mechanic) return <div>Mechanic not found</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/mechanics" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{mechanic.businessName}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${mechanic.isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {mechanic.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                        <div className="flex items-center text-yellow-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-gray-700 font-medium">{mechanic.rating?.average?.toFixed(1) || '0.0'}</span>
                            <span className="ml-1 text-gray-400">({mechanic.rating?.count || 0} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Mechanic Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Contact Person</div>
                                    <div className="text-sm text-gray-600">{mechanic.contactName || mechanic.userId?.firstName}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Email</div>
                                    <div className="text-sm text-gray-600">{mechanic.userId?.email}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Phone</div>
                                    <div className="text-sm text-gray-600">{mechanic.phone}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Address</div>
                                    <div className="text-sm text-gray-600">
                                        {mechanic.address?.street}, {mechanic.address?.suburb}<br />
                                        {mechanic.address?.state} {mechanic.address?.postcode}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>
                        <div className="flex flex-wrap gap-2">
                            {mechanic.servicesOffered?.map((service: string, index: number) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                        {isBookingsLoading ? (
                            <TableSkeleton showSearch={false} showAddButton={false} />
                        ) : (
                            <DataTable
                                columns={columns}
                                data={bookings}
                                searchKey="vehicleMake"
                                searchPlaceholder="Search bookings..."
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
