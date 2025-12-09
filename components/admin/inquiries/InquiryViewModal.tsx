import { Modal } from "@/components/ui/Modal";
import { Mail, Calendar, User, Phone, Car, Wrench, MessageSquare, X } from "lucide-react";
import { format } from "date-fns";

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
};

interface InquiryViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    inquiry: Inquiry | null;
}

export const InquiryViewModal = ({ isOpen, onClose, inquiry }: InquiryViewModalProps) => {
    if (!inquiry) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Inquiry Details">
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {/* Header with Status */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{inquiry.createdAt ? format(new Date(inquiry.createdAt), 'PPP p') : 'N/A'}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${inquiry.status === 'New'
                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                        : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                        {inquiry.status || 'Unknown'}
                    </span>
                </div>

                {/* Customer Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400">Name</p>
                                <p className="text-white font-medium">{inquiry.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400">Phone</p>
                                <p className="text-white font-medium">{inquiry.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 md:col-span-2">
                            <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white font-medium">{inquiry.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle & Service Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                        <div className="flex items-start gap-3">
                            <Car className="w-5 h-5 text-amber-500 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400">Vehicle</p>
                                <p className="text-white font-medium">{inquiry.make || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Wrench className="w-5 h-5 text-amber-500 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400">Service Required</p>
                                <p className="text-white font-medium">{inquiry.service || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Message</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                            {inquiry.message}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a] border-t border-gray-800 mt-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:bg-gray-900 rounded-md text-sm font-medium transition-colors"
                    >
                        Close
                    </button>
                    <a
                        href={`mailto:${inquiry.email}?subject=RE: Inquiry from AutoGuru&body=Hi ${inquiry.name},\n\nThank you for your inquiry regarding ${inquiry.make} ${inquiry.service}...\n\nBest regards,\nAutoGuru Team`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Reply via Email
                    </a>
                </div>
            </div>
        </Modal>
    );
};
