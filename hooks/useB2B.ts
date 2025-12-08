import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { b2bApi } from '@/lib/api';
import { toast } from 'sonner';

export const useB2B = () => {
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: b2bApi.register,
        onSuccess: (data) => {
            toast.success(data.message || 'Application submitted successfully');
            queryClient.invalidateQueries({ queryKey: ['b2b-proposals'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to submit application');
        },
    });

    const useB2BProposals = () => {
        return useQuery({
            queryKey: ['b2b-proposals'],
            queryFn: b2bApi.getAllProposals,
        });
    };

    const useB2BProposal = (id: string) => {
        return useQuery({
            queryKey: ['b2b-proposal', id],
            queryFn: () => b2bApi.getProposalById(id),
            enabled: !!id,
        });
    };

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => b2bApi.updateStatus(id, status),
        onSuccess: (data) => {
            toast.success(data.message || 'Status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['b2b-proposals'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update status');
        },
    });

    const deleteProposalMutation = useMutation({
        mutationFn: b2bApi.deleteProposal,
        onSuccess: (data) => {
            toast.success(data.message || 'Proposal deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['b2b-proposals'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete proposal');
        },
    });

    return {
        registerMutation,
        useB2BProposals,
        useB2BProposal,
        updateStatusMutation,
        deleteProposalMutation
    };
};
