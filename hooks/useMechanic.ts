import { mechanicApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMechanic = () => {
    const queryClient = useQueryClient();

    const registerMechanicMutation = useMutation({
        mutationFn: mechanicApi.registerMechanic,
        onSuccess: () => {
            toast.success("Mechanic registered successfully");
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to register mechanic");
        },
    });

    return { registerMechanicMutation };
};

export const useMechanics = () => {
    return useQuery({
        queryKey: ["mechanics"],
        queryFn: mechanicApi.getAllMechanics,
    });
};

export const useMechanicById = (id: string) => {
    return useQuery({
        queryKey: ["mechanic", id],
        queryFn: () => mechanicApi.getMechanicById(id),
        enabled: !!id,
    });
};

export const useMechanicBookings = (id: string) => {
    return useQuery({
        queryKey: ["mechanic-bookings", id],
        queryFn: () => mechanicApi.getMechanicBookings(id),
        enabled: !!id,
    });
};

export const useUpdateMechanic = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => mechanicApi.updateMechanic(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
            queryClient.invalidateQueries({ queryKey: ["mechanic", id] });
            toast.success("Mechanic updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update mechanic");
        },
    });
};

export const useUpdateMechanicStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => mechanicApi.updateMechanicStatus(id, status),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
            queryClient.invalidateQueries({ queryKey: ["mechanic", id] });
            toast.success("Mechanic status updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update mechanic status");
        },
    });
};

export const useDeleteMechanic = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mechanicApi.deleteMechanic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mechanics"] });
            toast.success("Mechanic deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete mechanic");
        },
    });
};
