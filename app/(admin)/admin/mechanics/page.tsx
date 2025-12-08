"use client";

import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Eye, CheckCircle, XCircle, Plus, Edit, Trash, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { toast } from "sonner";
import { useMechanics, useUpdateMechanicStatus, useDeleteMechanic } from "@/hooks/useMechanic";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

type Mechanic = {
    _id: string;
    businessName: string;
    contactName: string;
    userId: {
        email: string;
        firstName: string;
        lastName: string;
    };
    address: {
        suburb: string;
        state: string;
    };
    rating: {
        average: number;
        count: number;
    };
    isVerified: boolean;
    status: string;
};

export default function MechanicsPage() {
    const router = useRouter();
    const { data: mechanicsData, isLoading } = useMechanics();
    const { mutateAsync: updateStatus } = useUpdateMechanicStatus();
    const { mutateAsync: deleteMechanic } = useDeleteMechanic();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);

    const handleView = (mechanic: Mechanic) => {
        router.push(`/admin/mechanics/${mechanic._id}`);
    };

    const handleDelete = (mechanic: Mechanic) => {
        setSelectedMechanic(mechanic);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedMechanic) {
            await deleteMechanic(selectedMechanic._id);
            setIsDeleteModalOpen(false);
            setSelectedMechanic(null);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateStatus({ id, status });
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const columns: ColumnDef<Mechanic>[] = [
        {
            accessorKey: "businessName",
            header: "Business Name",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                        {row.original.businessName.charAt(0)}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("businessName") || 'N/A'}</div>
                        <div className="text-gray-400">{row.original.contactName}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "contactName",
            header: "Contact Person",
            cell: ({ row }) => <div className="text-gray-400">{row.original.userId ? `${row.original.userId.firstName} ${row.original.userId.lastName}` : 'N/A'}</div>,
        },
        {
            accessorKey: "address",
            header: "Location",
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{row.original.address?.suburb}, {row.original.address?.state}</span>
                </div>
            ),
        },
        {
            accessorKey: "rating",
            header: "Rating",
            cell: ({ row }) => (
                <div className="flex items-center text-gray-400">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                    {row.original.rating?.average?.toFixed(1) || '0.0'}
                    <span className="text-xs text-gray-500 ml-1">({row.original.rating?.count})</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let colorClass = 'bg-gray-100 text-gray-800';
                if (status === 'approved') colorClass = 'bg-green-100 text-green-800';
                if (status === 'rejected') colorClass = 'bg-red-100 text-red-800';
                if (status === 'pending') colorClass = 'bg-yellow-100 text-yellow-800';

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} capitalize`}>
                        {status || 'Pending'}
                    </span>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                            onClick={() => handleView(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        {row.original.status !== 'approved' && (
                            <button
                                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                title="Approve"
                                onClick={() => handleStatusUpdate(row.original._id, 'approved')}
                            >
                                <CheckCircle className="w-4 h-4" />
                            </button>
                        )}
                        {row.original.status !== 'rejected' && (
                            <button
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Reject"
                                onClick={() => handleStatusUpdate(row.original._id, 'rejected')}
                            >
                                <XCircle className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(row.original)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

    if (isLoading) {
        return <TableSkeleton />;
    }

    const data = mechanicsData?.data?.mechanics || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mechanics</h1>
                    <p className="text-gray-400 mt-1">Manage registered mechanics and approvals</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Mechanic
                </button>
            </div>

            <DataTable columns={columns} data={data} searchKey="businessName" searchPlaceholder="Search mechanics..." />

            {/* Add Mechanic Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Mechanic">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Mechanic added"); setIsAddModalOpen(false); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Auto Fix" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="123 Main St" />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">Add Mechanic</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Mechanic"
                description={`Are you sure you want to delete ${selectedMechanic?.businessName}? This action cannot be undone.`}
            />
        </div>
    );
}
