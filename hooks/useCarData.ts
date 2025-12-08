import { useQuery } from "@tanstack/react-query";
import { carDataApi } from "@/lib/api";

export const useCarMakes = () => {
    return useQuery({
        queryKey: ["carMakes"],
        queryFn: () => carDataApi.getMakes(),
    });
};

export const useCarModels = (make?: string) => {
    return useQuery({
        queryKey: ["carModels", make],
        queryFn: () => carDataApi.getModels(make!),
        enabled: !!make,
    });
};
