import React from "react";
import CarRepairServiceClient from "./CarRepairServiceClient";

async function getServices() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/services?includeSubServices=true`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch services');
        }

        const data = await res.json();
        return data.services || [];
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}

const ServiceList = async () => {
    const services = await getServices();
    return <CarRepairServiceClient services={services} />;
};

export default ServiceList;
    