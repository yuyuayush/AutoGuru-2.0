// import React from "react";
// import Image from "next/image";

// const FleetTestimonials = () => {
//     const testimonials = [
//         {
//             id: 1,
//             company: "City Logistics",
//             name: "Mariah",
//             role: "Business Owner",
//             image: "/hero/hero-car-1.avif",
//             content:
//                 "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.",
//         },
//         {
//             id: 2,
//             company: "Metro Transport",
//             name: "James",
//             role: "Fleet Manager",
//             image: "/hero/hero-car-2.avif",
//             content:
//                 "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.",
//         },
//         {
//             id: 3,
//             company: "Urban Delivery",
//             name: "Sarah",
//             role: "Operations Head",
//             image: "/hero/hero-car-3.avif",
//             content:
//                 "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.",
//         },
//     ];

//     // Duplicate the list for seamless looping
//     const duplicatedTestimonials = [...testimonials, ...testimonials];

//     return (
//         <section className="relative w-full py-24 bg-black overflow-hidden">
//             {/* Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <Image
//                     src="/images/homepage/dark_abstract_ribbed_background.png"
//                     alt="Abstract dark background"
//                     fill
//                     className="object-cover opacity-80"
//                     priority
//                 />
//                 {/* Overlay gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
//             </div>

//             <style>
//                 {`
//           @keyframes scroll-left {
//             0% { transform: translateX(0%); }
//             100% { transform: translateX(-50%); }
//           }
//           .animate-scroll {
//             animation: scroll-left 30s linear infinite;
//             will-change: transform;
//           }
//           .scroll-container:hover .animate-scroll {
//             animation-play-state: paused;
//           }
//           /* Fade mask for blending cards into the background edges */
//           .fade-mask::before, .fade-mask::after {
//             content: '';
//             position: absolute;
//             top: 0;
//             height: 100%;
//             width: 10vw;
//             z-index: 10;
//             pointer-events: none;
//           }
//           .fade-mask::before {
//             left: 0;
//             background: linear-gradient(to right, #000 0%, transparent 100%);
//           }
//           .fade-mask::after {
//             right: 0;
//             background: linear-gradient(to left, #000 0%, transparent 100%);
//           }
//         `}
//             </style>

//             <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
//                 {/* Header */}
//                 <div className="text-center mb-12 space-y-4">
//                     <h2 className="text-4xl md:text-5xl font-serif text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
//                         Testimonials
//                     </h2>
//                     <p className="text-gray-400 text-lg uppercase tracking-widest font-light">
//                         Experience That Speaks for Itself
//                     </p>
//                     <p className="text-white text-sm md:text-base max-w-2xl mx-auto pt-4">
//                         88% of auto repairers believe the AutoGuru fleet portal has a
//                         positive impact on their business
//                     </p>
//                 </div>

//                 {/* Scrolling Container */}
//                 <div className="relative w-full overflow-hidden whitespace-nowrap scroll-container fade-mask py-4">
//                     <div className="flex space-x-8 animate-scroll">
//                         {duplicatedTestimonials.map((item, index) => (
//                             <div
//                                 key={`${item.id}-${index}`}
//                                 className="bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-2 duration-300 w-[350px] md:w-[400px] flex-shrink-0 whitespace-normal"
//                             >
//                                 <div className="flex items-center gap-4 mb-4">
//                                     <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
//                                         <Image
//                                             src={item.image}
//                                             alt={item.company}
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-serif text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                                             [{item.company}]
//                                         </h3>
//                                         <p className="text-xs text-gray-500">
//                                             {item.name} - {item.role}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <p className="text-gray-600 text-sm leading-relaxed">
//                                     {item.content}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FleetTestimonials;

"use client";

import React from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/constants";

const FleetTestimonials = () => {
  // Logic for desktop infinite scroll
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/*Header */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></span>
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase shadow-gold-glow">
                Client Success
              </span>
              <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
            </div>

            <h2 className="text-3xl md:text-6xl text-white leading-tight">
              <span className="block font-serif italic text-gray-400 mb-2">
                Experience that
              </span>
              <span className="block font-sans font-semibold uppercase tracking-tight leading-none text-transparent bg-clip-text bg-primary">
                Speaks for Itself.
              </span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mt-6 border-t border-primary/30 pt-6">
              Join hundreds of fleet managers who have streamlined their
              operations and reduced downtime with our premium portal.
            </p>
          </motion.div>
        </div>

        {/*DESKTOP VIEW: Infinite Scroll*/}
        <div className="hidden md:block relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 50,
              repeat: Infinity,
            }}
          >
            {duplicatedTestimonials.map((item, index) => (
              <TestimonialCard
                key={`desktop-${index}`}
                item={item}
                className="w-[400px] flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>

        {/* MOBILE VIEW: Vertical Stack with Scroll Animation */}
        <div className="md:hidden flex flex-col gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={`mobile-${item.id}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TestimonialCard item={item} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ item, className }) => (
  <div
    className={`group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/[0.05] hover:border-primary/30 ${className}`}
  >
    <Quote className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 text-white/5 rotate-180 group-hover:text-primary/10 transition-colors duration-500" />

    <div className="flex items-center gap-5 mb-6 relative z-10">
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors duration-500">
        <Image
          src={item.image}
          alt={item.company}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-primary transition-colors">
          {item.company}
        </h3>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
          {item.name} • {item.role}
        </p>
      </div>
    </div>

    <div className="flex gap-1 mb-4">
      {[...Array(item.rating)].map((_, i) => (
        <Star key={i} className="w-3 h-3 text-primary fill-primary" />
      ))}
    </div>

    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
      "{item.content}"
    </p>

    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
  </div>
);

export default FleetTestimonials;
