// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const ServicesOffered = () => {

//     const services = [
//         {
//             id: 1,
//             title: "Car servicing",
//             image: "/hero/hero-car-1.avif",
//             link: "/car-servicing",
//         },
//         {
//             id: 2,
//             title: "Mechanics",
//             image: "/hero/hero-car-2.avif",
//             link: "/mechanics",
//         },
//         {
//             id: 3,
//             title: "Windscreens",
//             image: "/hero/hero-car-3.avif",
//             link: "/windscreens",
//         },
//         {
//             id: 4,
//             title: "Clutch",
//             image: "/gallery/engine-repair.jpg",
//             link: "/car-repair-service/clutch",
//         },
//         {
//             id: 5,
//             title: "Suspension & Steering",
//             image: "/gallery/diagnostic.jpg",
//             link: "/car-repair-service/suspension",
//         },
//     ];

//     return (
//         <section className="w-full py-24 bg-white">
//             <div className="container mx-auto px-4 md:px-6 lg:px-8">
//                 {/* Header */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
//                         Services offered
//                     </h2>
//                     <p className="text-gray-600 text-sm md:text-base">
//                         Everything your car needs, all in one place.
//                     </p>
//                 </div>

//                 {/* Services Grid */}
//                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0">
//                     {services.map((service) => (
//                         <Link
//                             href={service.link}
//                             key={service.id}
//                             className="group flex flex-col items-center space-y-4 min-w-[200px]"
//                         >
//                             <div className="relative w-48 h-32 md:w-40 md:h-28 lg:w-48 lg:h-32 rounded-lg overflow-hidden shadow-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl  group-hover:grayscale-0">
//                                 <Image
//                                     src={service.image}
//                                     alt={service.title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                             <h3 className="text-lg font-serif text-gray-900 text-center max-w-[150px] leading-tight group-hover:text-emerald-600 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                 {service.title}
//                             </h3>
//                         </Link>
//                     ))}

//                     {/* View More Link */}
//                     <Link
//                         href="/services"
//                         className="text-blue-500 hover:text-blue-700 text-sm font-medium underline decoration-1 underline-offset-4 ml-4 whitespace-nowrap"
//                     >
//                         + view more
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ServicesOffered;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/lib/constants";

const ServicesOffered = () => {
  return (
    <section className="relative w-full py-20 md:py-32 bg-black text-white overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-6">
        {/*HEADER SECTION*/}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase shadow-gold-glow">
                Expert Care
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              <span className="font-serif italic text-gray-400 mb-1  md:inline">
                Premium{" "}
              </span>
              <span className="font-sans font-semibold uppercase tracking-tight text-transparent bg-clip-text bg-primary">
                Services
              </span>
            </h2>
          </motion.div>

          {/* Desktop View All Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link
              href="/services"
              className="group flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-primary transition-colors"
            >
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/*SERVICES GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={service.link}
                className="group relative block w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(191,149,63,0.15)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="text-xs font-mono text-primary/60 mb-2 block">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-serif text-white leading-tight group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Mobile View More Link */}
          <div className="col-span-full md:hidden mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white border-b border-primary pb-1 active:text-primary transition-colors"
            >
              View All Services
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;
