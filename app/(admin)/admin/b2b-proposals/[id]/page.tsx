"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, FileText, CheckCircle, XCircle, Download, Eye } from "lucide-react";
import { toast } from "sonner";

import { useB2B } from "@/hooks/useB2B";
import { Loader2 } from "lucide-react";

const ProposalDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const { useB2BProposal, updateStatusMutation } = useB2B();
    const { data, isLoading, error } = useB2BProposal(id);

    // Assuming the API returns the proposal object directly or wrapped in `proposal` key
    const proposal = data?.proposal || data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error || !proposal) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-red-500">
                <p>Failed to load proposal details</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    const handleApprove = () => {
        updateStatusMutation.mutate(
            { id, status: 'approved' },
            {
                onSuccess: () => {
                    // toast.success handled in hook
                    router.push("/admin/b2b-proposals");
                }
            }
        );
    };

    const handleReject = () => {
        if (confirm("Are you sure you want to reject this proposal?")) {
            updateStatusMutation.mutate(
                { id, status: 'rejected' },
                {
                    onSuccess: () => {
                        router.push("/admin/b2b-proposals");
                    }
                }
            );
        }
    };

    return (
        <div className="space-y-6">
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Proposals
            </button>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">{proposal.businessName}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 border border-yellow-800/50 rounded-full text-sm font-medium">
                            Pending Review
                        </span>
                        <span className="text-gray-400 text-sm">
                            Submitted on {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReject}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-red-900/50 text-red-500 rounded-lg hover:bg-red-950/30 font-medium transition-colors"
                    >
                        <XCircle className="w-4 h-4" />
                        Reject
                    </button>
                    <button
                        onClick={handleApprove}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-lg shadow-green-900/20"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Approve Partnership
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111] rounded-xl shadow-sm border border-gray-800 p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Business Details</h2>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                                <dd className="mt-1 text-sm text-gray-300">{proposal.contactName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">ABN</dt>
                                <dd className="mt-1 text-sm text-gray-300 font-mono">{proposal.abn}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-300">{proposal.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-300">{proposal.phone}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-300">{proposal.address}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-[#111] rounded-xl shadow-sm border border-gray-800 p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Submitted Documents</h2>
                        <div className="space-y-3">
                            <div className="space-y-3">
                                {proposal.documents && Object.keys(proposal.documents).length > 0 ? (
                                    Object.entries(proposal.documents).map(([key, doc]: [string, any]) => {
                                        if (!doc) return null;

                                        const formatLabel = (key: string) => {
                                            return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                                        };

                                        return (
                                            <div key={key} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg hover:border-[#c4912c]/50 transition-colors bg-gray-900/30">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-200">{formatLabel(key)}</p>
                                                        <p className="text-xs text-gray-500">{doc.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            const win = window.open();
                                                            if (win) {
                                                                win.document.write(`<img src="${doc.base64}" style="max-width: 100%; height: auto;" />`);
                                                            }
                                                        }}
                                                        className="p-2 text-[#c4912c] hover:bg-[#c4912c]/10 rounded-lg transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <a
                                                        href={doc.base64}
                                                        download={doc.name}
                                                        className="p-2 text-[#c4912c] hover:bg-[#c4912c]/10 rounded-lg transition-colors"
                                                        title="Download"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 italic">No documents submitted.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-900/10 rounded-xl p-6 border border-blue-900/30">
                        <h2 className="text-lg font-bold text-blue-400 mb-2">Verification Checklist</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-blue-300">
                                <input type="checkbox" className="rounded border-blue-800 bg-blue-950/50 text-blue-500 focus:ring-blue-500" />
                                Valid ABN
                            </label>
                            <label className="flex items-center gap-2 text-sm text-blue-300">
                                <input type="checkbox" className="rounded border-blue-800 bg-blue-950/50 text-blue-500 focus:ring-blue-500" />
                                Insurance Currency
                            </label>
                            <label className="flex items-center gap-2 text-sm text-blue-300">
                                <input type="checkbox" className="rounded border-blue-800 bg-blue-950/50 text-blue-500 focus:ring-blue-500" />
                                Address Verification
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDetailPage;
