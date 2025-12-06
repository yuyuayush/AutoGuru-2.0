import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carSubServiceApi } from "@/lib/api";
import { toast } from "sonner";

export const useCarSubServices = (serviceId?: string) => {
    return useQuery({
        queryKey: ["carSubServices", serviceId],
        queryFn: () => carSubServiceApi.getSubServicesByServiceId(serviceId),

        enabled: !!serviceId,
    });
};

export const useCarSubService = (id: string) => {
    return useQuery({
        queryKey: ["carSubService", id],
        queryFn: () => carSubServiceApi.getSubServiceById(id),
        enabled: !!id,
    });
};

export const useCreateCarSubService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: carSubServiceApi.createSubService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carSubServices"] });
            queryClient.invalidateQueries({ queryKey: ["carServices"] }); // In case services list includes sub-service count
            toast.success("Sub-service created successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create sub-service");
        },
    });
};

export const useUpdateCarSubService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            carSubServiceApi.updateSubService(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carSubServices"] });
            queryClient.invalidateQueries({ queryKey: ["carServices"] });
            toast.success("Sub-service updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update sub-service");
        },
    });
};

export const useDeleteCarSubService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: carSubServiceApi.deleteSubService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carSubServices"] });
            queryClient.invalidateQueries({ queryKey: ["carServices"] });
            toast.success("Sub-service deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete sub-service");
        },
    });
};
