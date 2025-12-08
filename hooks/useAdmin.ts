import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/useAuthStore';

export const useAdmin = () => {
    const router = useRouter();
    const { login } = useAuthStore();

    const adminSignupMutation = useMutation({
        mutationFn: ({ data, secret }: { data: any, secret?: string }) => authApi.adminSignup(data, secret),
        onSuccess: (data) => {
            toast.success(data.message || 'Admin account created successfully');
            if (data.token && data.user) {
                login(data.user, data.token);
            }
            router.push('/admin/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create admin account');
        },
    });

    const adminLoginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (data.user?.role !== 'admin') {
                toast.error('Unauthorized: Admin access only');
                return;
            }

            toast.success(data.message || 'Admin login successful');
            if (data.token && data.user) {
                login(data.user, data.token);
            }
            router.push('/admin/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Login failed');
        },
    });

    return {
        adminSignupMutation,
        adminLoginMutation
    };
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => authApi.getAllUsers(),
    });
};
