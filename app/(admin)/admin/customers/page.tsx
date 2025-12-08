"use client";

import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Eye, Edit, Trash, Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { toast } from "sonner";
import { useGetAllUsers } from "@/hooks/useAdmin";
import { format } from "date-fns";

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    status: string;
};

const getInitials = (firstName: string = "", lastName: string = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const getRandomColor = (name: string) => {
    const colors = [
        "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
        "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
        "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
        "bg-pink-500", "bg-rose-500"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export default function CustomersPage() {
    const { data: usersData, isLoading } = useGetAllUsers();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        // In a real app, you would call a delete mutation here
        toast.success(`Customer ${selectedUser?.firstName} deleted`);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;
                const fullName = `${user.firstName} ${user.lastName}`;
                const initials = getInitials(user.firstName, user.lastName);
                const bgColor = getRandomColor(fullName);

                return (
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${bgColor} shadow-sm`}>
                            {initials}
                        </div>
                        <div className="font-medium text-[var(--table-text-cell)]">
                            {fullName}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div className="text-gray-400">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Joined",
            cell: ({ row }) => {
                const date = row.getValue("createdAt") as string;
                return <div className="text-gray-400">{date ? format(new Date(date), 'MMM d, yyyy') : 'N/A'}</div>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Edit"
                            onClick={() => handleEdit(row.original)}
                        >
                            <Edit className="w-4 h-4" />
                        </button>
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
        return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
    }

    // Handle API response structure (checking if data.data or data contains the array)
    // Filter for only 'user' role
    const allUsers = Array.isArray(usersData?.data) ? usersData.data : (Array.isArray(usersData) ? usersData : []);
    // Ensure we are robust against missing role (though schema implies it exists)
    const customers = allUsers.filter((user: User) => user.role === 'user');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Customers</h1>
                    <p className="text-gray-400 mt-1">Manage registered customers</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Customer
                </button>
            </div>

            <DataTable columns={columns} data={customers} searchKey="firstName" searchPlaceholder="Search customers..." />

            {/* Add Customer Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Customer added"); setIsAddModalOpen(false); }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                            <input type="text" className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                            <input type="text" className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input type="email" className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" />
                    </div>
                    {/* Role is hidden/defaulted to Customer for this page */}
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">Add Customer</button>
                    </div>
                </form>
            </Modal>

            {/* Edit Customer Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Customer">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Customer updated"); setIsEditModalOpen(false); }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                            <input type="text" defaultValue={selectedUser?.firstName} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                            <input type="text" defaultValue={selectedUser?.lastName} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input type="email" defaultValue={selectedUser?.email} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">Save Changes</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Customer"
                description={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
            />
        </div>
    );
}
