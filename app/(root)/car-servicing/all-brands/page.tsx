import CarBrandList from "@/components/car-servicing/CarBrandList";

const AllBrandsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        All Car Brands
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Select your car make to find the best service quotes.
                    </p>
                </div>
                <CarBrandList />
            </div>
        </div>
    );
};

export default AllBrandsPage;
