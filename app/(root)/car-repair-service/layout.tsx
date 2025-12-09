import DynamicBreadcrumbs from "@/components/general/DynamicBreadcrumbs";
import SearchHero from "@/components/general/SearchHero";

export default function CarRepairLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <SearchHero
                title={
                    <span>
                        NEED A <span className="text-[#bf953f]">REPAIR</span> ON YOUR CAR?
                    </span>
                }
                subtitle="INSTANTLY BOOK AUSTRALIA'S BEST MECHANICS."
                backgroundImage="/car-service/car-service-banner-bg.jpg"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <DynamicBreadcrumbs />
            </div>
            {children}
        </div>
    );
}
