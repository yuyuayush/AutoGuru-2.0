// "use client";

// import React from "react";
// import Image from "next/image";
// import { CheckSquare } from "lucide-react";
// import { motion } from "framer-motion";
// import { expertServices } from "@/lib/constants";
// const ExpertCareSection = () => {
//   return (
//     <section className="relative w-full py-24 bg-black text-white overflow-hidden border-t border-white/5">
//       {/* --- ATMOSPHERE --- */}
//       <div className="absolute inset-0 bg-noise opacity-20" />
//       {/* Right side glow for balance */}
//       <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
//       {/* Left side glow */}
//       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

//       <div className="max-w-7xl mx-auto relative z-10 ">
//         {/* --- PART 1: CINEMATIC IMAGE --- */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-20 group"
//         >
//           <Image
//             src="/hero/expertCare-car.jpg"
//             alt="Luxury Car Rear View"
//             fill
//             className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
//             priority
//           />

//           {/* Dark Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
//         </motion.div>

//         {/* --- PART 2: CONTENT --- */}
//         <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
//           {/* Left:Typography Headline */}
//           <div className="max-w-xl sticky top-24">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               {/* Eyebrow Tag */}
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
//                 <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase shadow-gold-glow">
//                   Premium Repairs
//                 </span>
//               </div>

//               {/*Headline*/}
//               <h2 className="block mb-8">
//                 <span className="block font-serif italic text-3xl md:text-5xl text-gray-400 mb-3">
//                   Expert care for
//                 </span>
//                 <span className="block font-sans font-semibold text-4xl md:text-6xl text-white uppercase tracking-tight leading-[0.9]">
//                   Every Part of <br />
//                   {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary"> */}
//                   <span className="text-transparent bg-clip-text bg-primary">
//                     Your Car.
//                   </span>
//                 </span>
//               </h2>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="fleet-text-reveal text-foreground-muted text-sm md:text-base leading-relaxed tracking-wide mb-10 max-w-lg border-l border-primary/30 pl-6"
//             >
//               Precision servicing designed to keep your vehicle performing at
//               its absolute best. We use factory-approved parts and
//               state-of-the-art diagnostic tools.
//             </motion.p>
//           </div>

//           {/* Right: Service Grid*/}
//           <div className="w-full lg:flex-1">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {expertServices.map((service, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/5 p-5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
//                 >
//                   <div className="flex items-start gap-4 z-10 relative">
//                     {/* Icon Box */}
//                     <div className="mt-1 w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
//                       <CheckSquare className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
//                     </div>

//                     {/* Text */}
//                     <span className="text-base text-gray-300 group-hover:text-white transition-colors font-medium leading-tight pt-1">
//                       {service}
//                     </span>
//                   </div>

//                   {/* Hover Gradient Background */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExpertCareSection;


"use client";

import React from "react";
import Image from "next/image";
import { CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { expertServices } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const ExpertCareSection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-black text-white overflow-hidden border-t border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-6">
        
        {/* Cinematic Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-[300px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 md:mb-20 group"
        >
          <Image
            src="/hero/expertCare-car.jpg"
            alt="Luxury Car Rear View"
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-24">
          
          {/* Left: Typography & Heading */}
          <div className="max-w-xl w-full lg:sticky lg:top-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
                <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase shadow-gold-glow">
                  Premium Repairs
                </span>
              </div>

              <h2 className="block mb-6 md:mb-8">
                <span className="block font-serif italic text-2xl md:text-5xl text-gray-400 mb-2 md:mb-3">
                  Expert care for
                </span>
                <span className="block font-sans font-semibold text-3xl md:text-6xl text-white uppercase tracking-tight leading-[0.9]">
                  Every Part of <br />
                  <span className="text-transparent bg-clip-text bg-primary">
                    Your Car.
                  </span>
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed tracking-wide mb-8 md:mb-10 max-w-lg border-l border-primary/30 pl-6"
            >
              Precision servicing designed to keep your vehicle performing at
              its absolute best. We use factory-approved parts and
              state-of-the-art diagnostic tools.
            </motion.p>
          </div>

          {/* Right: Service Grid with Staggered Animation */}
          <motion.div 
            className="w-full lg:flex-1"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {expertServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/5 p-4 md:p-5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 md:gap-4 z-10 relative">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors shrink-0">
                      <CheckSquare className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors font-medium leading-tight pt-1.5">
                      {service}
                    </span>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExpertCareSection;