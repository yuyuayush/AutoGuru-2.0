// "use client";

// import React from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// const FleetPromo = () => {
//     return (
//         <section className="relative py-24 overflow-hidden">
//             {/* Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <img
//                     src="/hero/premium-care-bg.jpg"
//                     alt="Background"
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/70" /> {/* Subtle overlay */}
//             </div>

//             <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
//                 <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

//                     {/* Left Content */}
//                     <div className="w-full lg:w-1/2 text-left">
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.6 }}
//                         >
//                             <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                 Premium care for every vehicle you manage.
//                             </h2>
//                             <p className="text-gray-300 text-lg mb-8 font-light leading-relaxed">
//                                 One platform to book, track, and manage all fleet servicing.
//                                 Streamline your operations with real-time data and expert support.
//                             </p>

//                             <Link
//                                 href="/fleet-guru"
//                                 className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-sm font-medium hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm group"
//                             >
//                                 Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                             </Link>
//                         </motion.div>
//                     </div>

//                     {/* Right Visuals */}
//                     <div className="w-full lg:w-1/2 relative">
//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.8 }}
//                             className="relative"
//                         >
//                             {/* Dashboard Image */}
//                             <div className="relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
//                                 <img
//                                     src="/hero/monitor-screen.png"
//                                     alt="Fleet Dashboard"
//                                     className="w-full h-auto drop-shadow-2xl rounded-xl"
//                                 />
//                             </div>

//                             {/* Car Image Overlay */}
//                             <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-[40%] z-20 shadow-2xl rounded-lg overflow-hidden border-4 border-white/10 hidden md:block">
//                                 <img
//                                     src="/hero/premium-care-car.jpg"
//                                     alt="Fleet Vehicle"
//                                     className="w-full h-auto object-cover"
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FleetPromo;

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};



const FleetPromo = () => {
  return (
    <section className="relative w-full py-20 md:py-32 bg-black text-white overflow-hidden bg-noise border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-30" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary-border/10 rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase shadow-gold-glow">
                Fleet Management
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={fadeUp} className="block mb-6 md:mb-8">
              <span className="block font-serif italic text-3xl md:text-5xl text-gray-400 mb-2">
                Premium Care for
              </span>
              <span className="block font-sans font-semibold text-4xl md:text-6xl text-white uppercase tracking-tight leading-none">
                <span className="text-transparent bg-clip-text bg-primary">
                  Every Vehicle.
                </span>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-sm md:text-base leading-relaxed tracking-wide mb-8 md:mb-10 max-w-lg border-l border-primary/30 pl-6"
            >
              One platform to book, track, and manage all fleet servicing.
              Streamline your operations with real-time data, transparent
              pricing, and expert support designed for luxury fleets.
            </motion.p>

            {/* Button */}
            <motion.div variants={fadeUp}>
              <Link
                href="/fleet-guru"
                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 overflow-hidden rounded-full bg-white/5 border border-white/10 transition-all duration-500 hover:border-primary/50 hover:bg-white/10"
              >
                <span className="relative text-xs font-bold tracking-widest uppercase text-white group-hover:text-primary transition-colors flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4 text-primary transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/*RIGHT COLUMN: */}
          <div className="relative mt-12 lg:mt-0 perspective-1000">
            <div className="fleet-dashboard relative z-10 ml-auto w-full lg:w-[90%] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f8f9fa]">
              {/* Simulated Browser Bar*/}
              <div className="h-6 bg-gray-100 border-b border-gray-200 w-full flex items-center gap-1 px-3">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/hero/monitor-screen.png"
                  alt="Fleet Dashboard Interface"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Overlay Layer: The Car Image */}
            <div className="fleet-car-overlay absolute -bottom-10 -left-4 md:-bottom-16 md:-left-12 z-20 w-[65%] md:w-[55%] rounded-lg  border border-white/10 overflow-hidden">
              <div className="relative aspect-[4/3] bg-secondary">
                <Image
                  src="/hero/premium-care-car.jpg"
                  alt="Premium Service"
                  fill
                  className="object-cover"
                />
                {/* Dark Gradient Overlay on Image for text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetPromo;
