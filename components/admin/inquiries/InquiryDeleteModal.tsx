import { DeleteModal } from "@/components/ui/DeleteModal";

interface InquiryDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    inquiryName?: string;
}

export const InquiryDeleteModal = ({ isOpen, onClose, onConfirm, inquiryName }: InquiryDeleteModalProps) => {
    return (
        <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Inquiry"
            description={`Are you sure you want to delete this inquiry from ${inquiryName || 'this customer'}? This action cannot be undone.`}
        />
    );
};
