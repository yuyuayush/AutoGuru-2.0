import CarServiceHero from "@/components/car-servicing/CarServiceHero";
import CarBrandList from "@/components/car-servicing/CarBrandList";
import ServicesOffered from "@/components/homepage/ServicesOffered";


const CarServicingPage = () => {
  return (
    <div className="min-h-screen">
      <CarServiceHero />
      {/* <CarBrandList /> */}
      <ServicesOffered />
    </div>
  );
};

export default CarServicingPage;