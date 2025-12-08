export type VehicleMake = {
    id: string;
    _id?: string;
    name: string;
    image: string;
    description: string;
    models: any[];
    facts?: string;
    serviceCosts?: {
        logbook: number;
        basic: number;
    };
    logbookCost?: number;
    basicCost?: number;
};

export type VehicleModel = {
    id: string;
    _id?: string;
    name: string;
    image: string;
    description: string;
    serviceIntervals: ServiceInterval[];
};

export type ServiceInterval = {
    km: number;
    months: number;
    price: number;
};

export type CarService = {
    _id: string;
    title?: string;
    name?: string;
    slug: string;
    description: string;
    icon: string;
    features: string[];
    providers: any[];
    isActive: boolean;
    image?: string;
    subServices?: SubService[];
};

export type SubService = {
    _id: string;
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    serviceId?: string;
    compatibility?: {
        make: string;
        model: string;
        variant: string;
    }[];
};
