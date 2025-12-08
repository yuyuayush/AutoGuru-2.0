// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import HeroForm from "@/components/form/HeroForm";

// const Hero = () => {
//     return (
//         <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
//             {/* Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <img
//                     src="/hero/hero-section-image.jpg"
//                     alt="Premium Car Service"
//                     className="w-full h-full object-cover opacity-60"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-transparent" />
//             </div>

//             <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-end">

//                 {/* Content Container - Right Aligned */}
//                 <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-end text-right mt-20 md:mt-0">

//                     {/* Headlines */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="mb-12"
//                     >
//                         <h1 className="text-xl md:text-3xl lg:text-4xl font-serif text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                             Car servicing made easy
//                         </h1>
//                         <p className="text-gray-300 text-xs font-medium tracking-wide uppercase opacity-80">
//                             Know what you're paying for. Know who's working on your car.
//                         </p>
//                     </motion.div>

//                     {/* Quote Form */}
//                     <HeroForm />

//                 </div>
//             </div>
//         </section>
//     );
// };

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import HeroForm from "../form/HeroForm";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading & Text Animation
      gsap.fromTo(
        ".hero-text-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Car Animation
      gsap.fromTo(
        ".hero-car-layer",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" }
      );

      // Button Animation
      gsap.fromTo(
        ".hero-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center"
    >
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Spotlight Glow behind the car */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-background-soft blur-[120px] rounded-full pointer-events-none opacity-60 mix-blend-screen" />

      <div className="hero-car-layer absolute inset-0 w-full h-full z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[65vh] md:h-[150vh]">
          <Image
            src="/hero/landingPage-car.png"
            alt="Luxury Car Silhouette"
            fill
            className="object-contain object-bottom"
            priority
            quality={100}
          />
        </div>

        {/* Fade Overlay */}
        <div className="absolute inset-0 bg-hero-fade opacity-90" />
      </div>

      <div className="relative z-20 container mx-auto px-8 md:px-16 lg:px-24 h-full flex flex-col justify-center pb-20 md:pb-0">
        {/* Main Heading */}
        <div className="max-w-4xl -mt-[50px]">
          <h1 className="hero-text-reveal text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 font-sans uppercase">
            {/* Metallic Gold Gradient Text */}
            <span className="block font-bold text-transparent bg-clip-text bg-gold-gradient drop-shadow-sm">
              Car Servicing
            </span>
            {/* Thin White Text */}
            <span className="block text-foreground font-light tracking-wide mt-2">
              Made Easy
            </span>
          </h1>

          {/* Subtitles */}
          <div className="hero-text-reveal flex flex-col gap-4 mb-12 border-l-2 border-primary pl-6 py-1">
            <p className="text-foreground-muted text-[10px] md:text-[12px] tracking-[0.3em] font-medium uppercase hover:text-foreground transition-colors duration-300 cursor-default">
              Know what you're paying for.
            </p>
            <p className="text-foreground-muted text-[10px] md:text-[12px] tracking-[0.3em] font-medium uppercase hover:text-foreground transition-colors duration-300 cursor-default">
              Know who's working on your car.
            </p>
          </div>

          {/* Premium Button */}
          <div className="hero-btn">
            <Link
              href="/explore"
              className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full bg-secondary border border-secondary-border transition-all duration-500 hover:border-primary hover:shadow-[0_0_20px_rgba(191,149,63,0.3)]"
            >
              {/* Hover Fill Effect */}
              <span className="absolute inset-0 w-full h-full bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

              {/* Button Text */}
              <span className="relative text-foreground-dim text-sm font-medium tracking-widest uppercase group-hover:text-primary-glow transition-colors">
                Explore more
              </span>

              {/* Arrow Icon */}
              <svg
                className="w-4 h-4 ml-2 text-primary transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
