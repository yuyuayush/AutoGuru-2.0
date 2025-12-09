"use client";

import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Check, X, Building2, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useB2B } from "@/hooks/useB2B";
import { format } from "date-fns";

const B2BProposalsPage = () => {
    const router = useRouter();
    const { useB2BProposals, updateStatusMutation, deleteProposalMutation } = useB2B();
    const { data, isLoading, error } = useB2BProposals();

    const proposals = data?.proposals || [];

    const handleView = (id: string) => {
        router.push(`/admin/b2b-proposals/${id}`);
    };

    const handleStatusUpdate = (id: string, status: string) => {
        updateStatusMutation.mutate({ id, status });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this proposal?")) {
            deleteProposalMutation.mutate(id);
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "businessName",
            header: "Business Name",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                        <Building2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                        <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("businessName")}</div>
                        <div className="text-xs text-gray-500">{row.original.email}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "contactName",
            header: "Contact",
            cell: ({ row }) => (
                <div>
                    <div className="text-[var(--table-text-cell)] font-medium">{row.getValue("contactName")}</div>
                    <div className="text-xs text-gray-500">{row.original.phone}</div>
                </div>
            ),
        },
        {
            accessorKey: "abn",
            header: "ABN",
            cell: ({ row }) => <div className="text-gray-600 font-mono text-xs">{row.getValue("abn")}</div>,
        },
        {
            accessorKey: "date",
            header: "Submitted",
            cell: ({ row }) => {
                const date = row.original.createdAt ? new Date(row.original.createdAt) : new Date();
                return <div className="text-gray-500 text-sm">{format(date, "MMM dd, yyyy")}</div>
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let colorClass = "bg-yellow-100 text-yellow-800";
                if (status === "approved") colorClass = "bg-green-100 text-green-800";
                if (status === "rejected") colorClass = "bg-red-100 text-red-800";

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end space-x-2">
                    {row.original.status === 'pending' && (
                        <>
                            <button
                                onClick={() => handleStatusUpdate(row.original._id, 'approved')}
                                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Approve"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(row.original._id, 'rejected')}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Reject"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => handleView(row.original._id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-red-500">
                <p>Failed to load proposals</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">B2B Partnership Proposals</h1>
                <p className="text-gray-400 mt-1">Review and manage partnership applications from businesses.</p>
            </div>

            <div className="bg-[#111] rounded-xl shadow-sm border border-gray-800 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={proposals}
                    searchKey="businessName"
                    searchPlaceholder="Search proposals..."
                />
            </div>
        </div>
    );
};

export default B2BProposalsPage;
