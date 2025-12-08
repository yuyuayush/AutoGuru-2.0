// import React from "react";
// import { Phone, ArrowDown, Zap, HandCoins } from "lucide-react";

// const FleetServicingFeatures = () => {
//     return (
//         <section className="w-full py-24 bg-white">
//             <div className="container mx-auto px-4 md:px-6 lg:px-8">
//                 <div className="text-center mb-16">
//                     <h2 className="text-3xl md:text-5xl font-serif font-light text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                         One portal to make fleet servicing easy.
//                     </h2>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
//                     {/* Feature 1: Fewer calls */}
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="relative mb-2">
//                             <Phone className="w-12 h-12 text-red-500 fill-red-500" />
//                             <ArrowDown className="w-8 h-8 text-red-500 absolute -bottom-4 left-1/2 -translate-x-1/2 stroke-[3px]" />
//                         </div>
//                         <div className="mt-4">
//                             <h3 className="text-xl font-serif font-medium text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                 Fewer calls
//                             </h3>
//                             <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">
//                                 95% reduction in fleet approval calls
//                             </p>
//                         </div>
//                     </div>

//                     {/* Feature 2: Quicker approvals */}
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="mb-2">
//                             <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400" />
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-serif font-medium text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                 Quicker approvals
//                             </h3>
//                             <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">
//                                 Bookings can be managed online
//                             </p>
//                         </div>
//                     </div>

//                     {/* Feature 3: Faster payment */}
//                     <div className="flex flex-col items-center text-center space-y-4">
//                         <div className="mb-2">
//                             <HandCoins className="w-12 h-12 text-yellow-600 stroke-1" />
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-serif font-medium text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                 Faster payment
//                             </h3>
//                             <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">
//                                 Get paid within days instead of weeks or months
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FleetServicingFeatures;

// "use client";

// import React from "react";
// import { Phone, Zap, HandCoins, ArrowDown } from "lucide-react";
// import { motion } from "framer-motion";

// const FleetServicingFeatures = () => {
//   const features = [
//     {
//       icon: <Phone className="w-8 h-8 text-white" />,
//       subIcon: <ArrowDown className="w-4 h-4 text-red-500 absolute -bottom-1 -right-1 stroke-[3px]" />,
//       title: "Fewer Calls",
//       desc: "95% reduction in fleet approval calls.",
//       color: "bg-red-500/20 border-red-500/30",
//       glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
//     },
//     {
//       icon: <Zap className="w-8 h-8 text-white fill-current" />,
//       title: "Quicker Approvals",
//       desc: "Manage bookings online instantly.",
//       color: "bg-yellow-400/20 border-yellow-400/30",
//       glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]"
//     },
//     {
//       icon: <HandCoins className="w-8 h-8 text-white" />,
//       title: "Faster Payment",
//       desc: "Get paid within days, not months.",
//       color: "bg-primary/20 border-primary/30",
//       glow: "group-hover:shadow-[0_0_30px_rgba(191,149,63,0.3)]"
//     }
//   ];

//   return (
//     <section className="relative w-full py-32 bg-black text-white overflow-hidden border-t border-white/5">

//       {/* 1. Background Magic */}
//       <div className="absolute inset-0 bg-noise opacity-30" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

//       <div className="container mx-auto px-6 md:px-12 relative z-10">

//         {/* 2. Heading */}
//         <div className="text-center mb-20">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl lg:text-6xl leading-tight"
//           >
//             <span className="font-serif italic text-white/80" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 One portal to make
//             </span> <br />
//             <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c4912c] via-[#fcf6ba] to-[#b38728] uppercase tracking-wide">
//                 Fleet Servicing Easy.
//             </span>
//           </motion.h2>
//         </div>

//         {/* 3. Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               className={`group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${feature.glow}`}
//             >
//               {/* Icon Container */}
//               <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${feature.color} border`}>
//                   {feature.icon}
//                   {feature.subIcon}
//               </div>

//               {/* Text */}
//               <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-primary transition-colors">
//                   {feature.title}
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed font-light">
//                   {feature.desc}
//               </p>

//               {/* Corner Accent */}
//               <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default FleetServicingFeatures;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { features } from "@/lib/constants";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const FleetServicingFeatures = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black text-white overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Eyebrow Tag */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></span>
            <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase shadow-gold-glow">
              Why Choose Us
            </span>
            <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight">
            <span className="block font-serif italic text-gray-400 mb-2 md:mb-3">
              One portal to make
            </span>
            <span className="block font-sans font-semibold text-transparent bg-clip-text bg-primary uppercase tracking-wide leading-none">
              Fleet Servicing Easy.
            </span>
          </h2>
        </motion.div>

        {/* Features Grid with Staggered Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }} // Hover Animation: Moves Up
              className={`group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 ${feature.glowColor} ${feature.borderColor}`}
            >
              {/* Icon Container */}
              <div
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${feature.color} border`}
              >
                {feature.icon}
                {feature.subIcon}
              </div>

              {/* Text Content */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-wide group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feature.desc}
              </p>

              {/* Decorative Corner Dot */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FleetServicingFeatures;
