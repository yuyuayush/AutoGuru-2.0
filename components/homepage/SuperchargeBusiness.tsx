// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// const SuperchargeBusiness = () => {
//     return (
//         <section className="max-w-7xl  mx-auto py-32  bg-white">
//             <div className="container mx-auto px-4 md:px-6 lg:px-8">
//                 {/* Banner Image */}
//                 <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-12 rounded-lg ">
//                     <Image
//                         src="/hero/super-charge-image.jpg"
//                         alt="Modern auto repair workshop"
//                         fill
//                         className="object-cover"
//                         priority
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//                     {/* Left Column */}
//                     <div className="space-y-8">
//                         <h2 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
//                             Supercharge your <br /> <span className="italic text-gray-600">auto repair business.</span>
//                         </h2>
//                         <p className="text-gray-600 text-lg max-w-md font-light leading-relaxed">
//                             Grow your online presence and manage digital bookings all in one
//                             place with our premium partner tools.
//                         </p>
//                         <Link
//                             href="/supplier/signup"
//                             className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-medium hover:bg-black transition-all duration-300 group rounded-sm shadow-lg hover:shadow-xl"
//                         >
//                             Partner with us
//                             <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                         </Link>
//                     </div>

//                     {/* Right Column */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 border-l border-gray-200 pl-0 md:pl-8 lg:pl-12">
//                         {/* Flexible Payments */}
//                         <div className="flex flex-col items-center text-center space-y-3">
//                             <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-2">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-lg font-sans font-medium text-gray-900">Flexible Payments</h3>
//                             <p className="text-xs text-gray-400 max-w-[200px]">
//                                 Convert more customers with flexible payment options Afterpay, humm and Zip, online and in-store.
//                             </p>
//                         </div>

//                         {/* Reserve with Google */}
//                         <div className="flex flex-col items-center text-center space-y-3">
//                             <div className="flex items-center gap-1 mb-2">
//                                 <span className="text-xl font-bold text-gray-500">G</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <span className="text-sm font-sans font-medium text-gray-600 uppercase tracking-wider">Reserve with</span>
//                                 <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">Google</span>
//                             </div>
//                             <p className="text-xs text-gray-400 max-w-[200px]">
//                                 Make it easy for your customers to book directly from Google Search and Maps.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SuperchargeBusiness;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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

const SuperchargeBusiness = () => {
  return (
    <section className="relative w-full py-20 md:py-32 bg-black text-white overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Top Section: Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-20 lg:mb-24">
          {/* Left: Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Eyebrow Tag */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent"></span>
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase shadow-gold-glow">
                Partner Program
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={fadeInUp} className="block">
              <span className="block font-serif italic text-3xl md:text-5xl text-gray-400 mb-2 md:mb-3">
                Supercharge your
              </span>
              <span className="block font-sans font-semibold text-4xl md:text-6xl text-white uppercase tracking-tight leading-none">
                <span className="text-transparent bg-clip-text bg-primary">
                  Auto Repair Business.
                </span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-md border-l border-primary/30 pl-6"
            >
              Grow your online presence and manage digital bookings all in one
              place with our premium partner tools.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-4">
              <Link
                href="/supplier/signup"
                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 overflow-hidden rounded-full border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                <span className="relative text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-primary flex items-center gap-2 transition-colors">
                  Partner with us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <div className="relative aspect-[4/3] w-full bg-gray-900">
                <Image
                  src="/hero/super-charge-image.jpg"
                  alt="Modern auto repair workshop"
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-white/10 pt-12 md:pt-16"
        >
          {/* Feature 1 */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center space-y-4 relative md:border-r border-white/10 md:pr-12"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 group hover:border-primary/50 transition-colors">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
              Flexible Payments
            </h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-xs leading-relaxed">
              Convert more customers with flexible payment options like
              Afterpay, humm and Zip, online and in-store.
            </p>
          </motion.div>

          {/* Feature 2: Reserve with Google */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center space-y-4 md:pl-12"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 border border-white/10 flex items-center justify-center mb-2 shadow-lg shadow-white/10">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold text-white tracking-wide">
                RESERVE WITH
              </span>
              <span className="text-lg md:text-xl font-bold text-gray-300">
                Google
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-500 max-w-xs leading-relaxed">
              Make it easy for your customers to book directly from Google
              Search and Maps.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuperchargeBusiness;
