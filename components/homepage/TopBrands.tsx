// import React from "react";
// import Image from "next/image";
// import { BRANDS } from "@/lib/constants";

// const TopBrands = () => {
//     // Select a subset of brands to display in the grid
//     // The design shows roughly 8 brands. We'll use 8 from our list.
//     const displayBrands = BRANDS.slice(0, 8);

//     return (
//         <section className="relative w-full py-24 bg-black overflow-hidden">
//             {/* Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <Image
//                     src="/hero/top-brand-top-service-image.jpg"
//                     alt="Car tail light background"
//                     fill
//                     className="object-cover opacity-60"
//                     priority
//                 />
//                 {/* Overlay gradient to ensure text readability */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/30 to-transparent" />
//             </div>

//             <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     {/* Left Column: Text */}
//                     <div className="space-y-6 max-w-xl">
//                         <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                             Top brands. Top service. <br />
//                             <span className="text-gray-300">Zero hassle.</span>
//                         </h2>
//                         <p className="text-gray-400 text-lg">
//                             Servicing top auto brands in Australia.
//                         </p>
//                     </div>

//                     {/* Right Column: Logo Grid */}
//                     <div className="grid grid-cols-3 gap-4 auto-rows-[120px] md:auto-rows-[160px]">
//                         {/* Row 1 - 3 cards */}
//                         {displayBrands.slice(0, 3).map((brand, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white rounded-lg p-6 flex items-center justify-center transition-transform hover:scale-105 duration-300"
//                             >
//                                 <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
//                             </div>
//                         ))}

//                         {/* Row 2 Left card */}
//                         <div className="col-span-1  bg-white rounded-lg p-6 flex items-center justify-center">
//                             <img src={displayBrands[3].logo} alt="" className="w-full h-full object-contain" />
//                         </div>

//                         {/* Row 2 Middle SMALL card */}
//                         <div className="col-span-1 h-[80px] md:h-[100px] bg-white rounded-lg p-4 flex items-center justify-center my-auto">
//                             <img src={displayBrands[4].logo} alt="" className="w-full h-full object-contain" />
//                         </div>

//                         {/* Row 2 Right card */}
//                         <div className="col-span-1  bg-white rounded-lg p-6 flex items-center justify-center">
//                             <img src={displayBrands[5].logo} alt="" className="w-full h-full object-contain" />
//                         </div>

//                         {/* Row 3 - 2 cards long */}
//                         <div className="col-span-3 grid grid-cols-2 gap-4">
//                             {displayBrands.slice(6, 8).map((brand, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white rounded-lg p-6 flex items-center justify-center h-24 md:h-28"
//                                 >
//                                     <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TopBrands;


"use client";

import React from "react";
import { BRANDS } from "@/lib/constants";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const TopBrands = () => {
  // Ensure enough items for seamless looping
  const seamlessBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="relative w-full py-20 md:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      {/* Header Section */}
      <div className="container mx-auto px-4 relative z-10 text-center mb-16 md:mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></span>
            <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase shadow-gold-glow">
              Trusted Partners
            </span>
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
          </div>

          {/* Headline */}
          <h2 className="block mb-6">
            <span className="block font-serif italic text-2xl md:text-5xl text-gray-400 mb-2">
              Top Brands. Top Service.
            </span>
            <span className="block font-sans font-semibold text-3xl md:text-6xl text-white uppercase tracking-tight leading-none">
              <span className="text-transparent bg-clip-text bg-primary">
                Zero Hassle.
              </span>
            </span>
          </h2>

          <p className="text-gray-400 text-xs md:text-base font-light tracking-wide max-w-xl mx-auto border-t border-primary/30 pt-6 mt-4">
            We are authorized to service the world's leading automotive
            manufacturers with factory-approved precision.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Slider */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Gradient Masks (Fade Effect on Edges) */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 md:gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
        >
          {seamlessBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="relative flex-shrink-0 w-36 h-24 md:w-56 md:h-36 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm flex items-center justify-center p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.08] hover:border-primary/30 hover:shadow-[0_0_30px_rgba(191,149,63,0.1)] cursor-pointer group/card"
            >
              {/* Logo */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  draggable="false"
                  className="w-full h-full object-contain filter grayscale brightness-150 opacity-40 group-hover/card:filter-none group-hover/card:opacity-100 group-hover/card:brightness-100 transition-all duration-500 transform group-hover/card:scale-110"
                />
              </div>

              {/* Shine Overlay */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopBrands;
