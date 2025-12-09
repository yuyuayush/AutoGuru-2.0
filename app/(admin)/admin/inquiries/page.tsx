"use client";

import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Eye, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useInquiries, useUpdateContactStatus } from "@/hooks/useContact";
import { useQueryClient } from "@tanstack/react-query";
import { InquiryViewModal } from "@/components/admin/inquiries/InquiryViewModal";
import { InquiryDeleteModal } from "@/components/admin/inquiries/InquiryDeleteModal";

// Type matching API response
type Inquiry = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    make: string;
    service: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

const getInitials = (name: string = "") => {
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
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

export default function InquiriesPage() {
    const queryClient = useQueryClient();
    const { data: contactsData, isLoading } = useInquiries();
    const { mutate: updateStatus } = useUpdateContactStatus();

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const handleView = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsViewModalOpen(true);

        // Mark as read if currently 'New'
        if (inquiry.status === 'New') {
            updateStatus({ id: inquiry._id, status: 'Read' }, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["inquiries"] });
                }
            });
        }
    };

    const handleDelete = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        toast.info("Delete functionality would go here");
        setIsDeleteModalOpen(false);
        setSelectedInquiry(null);
    };

    const columns: ColumnDef<Inquiry>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const inquiry = row.original;
                const fullName = inquiry.name;
                const initials = getInitials(fullName);
                const bgColor = getRandomColor(fullName);
                const isUnread = inquiry.status === 'New';

                return (
                    <div className="flex items-center gap-3">
                        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${bgColor} shadow-sm`}>
                            {initials}
                            {isUnread && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#111] rounded-full"></span>
                            )}
                        </div>
                        <div>
                            <div className={`font-medium text-[var(--table-text-cell)] ${isUnread ? 'font-bold text-white' : ''}`}>
                                {fullName}
                            </div>
                            <div className="text-xs text-gray-500">{inquiry.phone}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
                const isUnread = row.original.status === 'New';
                return <div className={`text-gray-400 ${isUnread ? 'font-semibold text-gray-200' : ''}`}>{row.getValue("email")}</div>;
            },
        },
        {
            accessorKey: "make",
            header: "Vehicle",
            cell: ({ row }) => <div className="text-gray-400">{row.getValue("make") || 'N/A'}</div>,
        },
        {
            accessorKey: "service",
            header: "Service",
            cell: ({ row }) => <div className="text-gray-400">{row.getValue("service") || 'General'}</div>,
        },
        {
            accessorKey: "message",
            header: "Message",
            cell: ({ row }) => {
                const msg = row.getValue("message") as string;
                const isUnread = row.original.status === 'New';
                return <div className={`truncate max-w-xs text-gray-400 ${isUnread ? 'font-semibold text-gray-200' : ''}`}>{msg}</div>;
            },
        },
        {
            accessorKey: "createdAt",
            header: "Date",
            cell: ({ row }) => {
                const date = row.getValue("createdAt") as string;
                const isUnread = row.original.status === 'New';
                return <div className={`text-gray-400 ${isUnread ? 'font-semibold text-gray-200' : ''}`}>{date ? format(new Date(date), 'MMM d, yyyy') : 'N/A'}</div>;
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

    const inquiries = contactsData?.contacts || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Inquiries</h1>
                    <p className="text-gray-400 mt-1">Manage contact form submissions</p>
                </div>
            </div>

            <DataTable columns={columns} data={inquiries} searchKey="name" searchPlaceholder="Search inquiries..." />

            <InquiryViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                inquiry={selectedInquiry}
            />

            <InquiryDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                inquiryName={selectedInquiry?.name}
            />
        </div>
    );
}
