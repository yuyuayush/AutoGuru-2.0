// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { ChevronDown, Heart, Facebook, Instagram, Linkedin } from "lucide-react";
// import Logo from "../homepage/Logo";

// const Footer = () => {
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <footer className="bg-black text-white pt-20 pb-10 font-sans relative">
//       <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/hero/footer-bg.jpg')] bg-cover bg-center" />
//       <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">

//           {/* LEFT COLUMN */}
//           <div className="space-y-8">
//             <h3 className="text-xl font-medium">Are you an auto repairer?</h3>

//             <div className="flex gap-4">
//               <Link href="/supplier/login" className="px-8 py-3 bg-[#333] text-white text-sm rounded hover:bg-[#444]">
//                 Login
//               </Link>
//               <Link href="/supplier/signup" className="px-8 py-3 bg-white text-black text-sm rounded hover:bg-gray-200">
//                 Signup
//               </Link>
//             </div>

//             <div>
//               <h4 className="text-sm mb-1 font-medium">Our other sites</h4>
//               <Link
//                 href={"/b2b"}
//                 className="text-sm text-gray-400 underline underline-offset-4 decoration-gray-500 hover:text-white block"
//               >
//                 Bussiness
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm text-gray-400 underline underline-offset-4 decoration-gray-500 hover:text-white"
//               >
//                 New Zealand
//               </Link>
//             </div>

//             <div className="flex items-center gap-2">
//               <Heart className="w-4 h-4 text-red-600 fill-red-600" />
//               <span className="text-xs text-gray-500">Crafted by AIMP</span>
//             </div>
//           </div>

//           {/* CENTER COLUMN */}
//           <div className="flex flex-col items-center gap-8 text-center max-w-lg mx-auto">
//             <div className="bg-white p-4 rounded">
//               <Logo />
//             </div>

//             <div className="flex items-center  gap-4">
//               <div className="w-20 h-8  rounded-full bg-white border border-white/20 flex items-center justify-center">
//                 <span className="text-[10px] font-bold text-black">AG</span>
//               </div>
//               <p className="text-xs leading-relaxed text-gray-300">
//                 We acknowledge the Yugambeh people of the Gold Coast and their Elders past and present,
//                 as well as the Aboriginal and Torres Strait Islander communities across all regions we operate in.
//               </p>
//             </div>

//             <div className="flex gap-5">
//               <Link href="#"><Facebook className="w-4 h-4" /></Link>
//               <Link href="#"><Instagram className="w-4 h-4" /></Link>
//               <Link href="#"><Linkedin className="w-4 h-4" /></Link>
//             </div>

//             <p className="text-gray-400 text-sm">Copyright © 2025 AutoGuru Australia Pty Ltd</p>
//           </div>

//           {/* RIGHT COLUMN - QUICK LINKS */}
//           <div className="justify-self-end">
//             <h3 className="text-xl font-medium mb-6">Quick Links</h3>
//             <div className="space-y-4">

//               <div>
//                 <button
//                   onClick={() => toggleSection("mechanics")}
//                   className="flex items-center gap-2 hover:text-gray-300"
//                 >
//                   <span>Mechanics</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "mechanics" ? "rotate-180" : ""}`} />
//                 </button>
//                 {openSection === "mechanics" && (
//                   <div className="pt-2 pl-4 space-y-2">
//                     <Link href="/mechanics" className="text-sm text-gray-400 block hover:text-white">All Mechanics</Link>
//                     <Link href="/mechanics/sydney" className="text-sm text-gray-400 block hover:text-white">Sydney</Link>
//                     <Link href="/mechanics/melbourne" className="text-sm text-gray-400 block hover:text-white">Melbourne</Link>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <button
//                   onClick={() => toggleSection("repairs")}
//                   className="flex items-center gap-2 hover:text-gray-300"
//                 >
//                   <span>Popular Car Repairs</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "repairs" ? "rotate-180" : ""}`} />
//                 </button>
//                 {openSection === "repairs" && (
//                   <div className="pt-2 pl-4 space-y-2">
//                     <Link href="/car-servicing" className="block text-sm text-gray-400 hover:text-white">Car Servicing</Link>
//                     <Link href="/brakes" className="block text-sm text-gray-400 hover:text-white">Brakes</Link>
//                     <Link href="/suspension" className="block text-sm text-gray-400 hover:text-white">Suspension</Link>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <button
//                   onClick={() => toggleSection("makes")}
//                   className="flex items-center gap-2 hover:text-gray-300"
//                 >
//                   <span>Popular Makes</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "makes" ? "rotate-180" : ""}`} />
//                 </button>
//                 {openSection === "makes" && (
//                   <div className="pt-2 pl-4 space-y-2">
//                     <Link href="/toyota" className="block text-sm text-gray-400 hover:text-white">Toyota</Link>
//                     <Link href="/mazda" className="block text-sm text-gray-400 hover:text-white">Mazda</Link>
//                     <Link href="/hyundai" className="block text-sm text-gray-400 hover:text-white">Hyundai</Link>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Logo from "../homepage/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { footerLinks } from "@/lib/constants";
const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };



  return (
    <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5 font-sans">
      
      {/* ATMOSPHERE (Background Magic) */}
      <div className="absolute inset-0 bg-noise opacity-40" />
      {/* Top Gold Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* LEFT: SUPPLIER CTA (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div>
                <h3 className="text-2xl font-serif italic text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Are you a mechanic?
                </h3>
                <p className="text-gray-400 text-sm font-light">
                    Join our network of premium repairers.
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/supplier/login" 
                className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                href="/supplier/signup" 
                className="px-8 py-3 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(191,149,63,0.3)]"
              >
                Join Now
              </Link>
            </div>

            {/* Other Portals Links */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Other Portals</span>
              <div className="flex flex-col gap-2">
                  <Link href="/b2b" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    For Business
                  </Link>
                  <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    New Zealand
                  </Link>
              </div>
            </div>
          </div>

          {/* CENTER: BRAND & SOCIALS (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            {/* Logo in Glass Box */}
            <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-2xl">
               <div className="brightness-0 invert opacity-90 scale-110">
                  <Logo />
               </div>
            </div>

            <div className="max-w-xs space-y-6">
                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                    {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                        <Link key={i} href="#" className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group">
                            <Icon className="w-4 h-4" />
                        </Link>
                    ))}
                </div>

                {/* Separator */}
                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-black px-3 text-gray-500">
                             <span className="text-[10px] font-bold border border-gray-800 rounded px-1.5 py-0.5 text-gray-400">AG</span>
                        </span>
                    </div>
                </div>

                {/* Acknowledgment */}
                <p className="text-xs leading-relaxed text-gray-500 font-light">
                    We acknowledge the Traditional Custodians of country throughout Australia and their connections to land, sea and community.
                </p>
            </div>
          </div>

          {/* RIGHT: ACCORDION LINKS (4 Columns) */}
          <div className="lg:col-span-4 lg:pl-12">
            <h3 className="text-lg font-serif italic text-white mb-6 border-b border-white/10 pb-4 inline-block pr-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Quick Access
            </h3>
            
            <div className="space-y-4">
                {footerLinks.map((section) => (
                    <div key={section.id} className="border-b border-white/5 pb-2">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between text-left py-2 group"
                        >
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest group-hover:text-primary transition-colors">
                                {section.title}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${openSection === section.id ? "rotate-180 text-primary" : "group-hover:text-white"}`} />
                        </button>
                        <AnimatePresence>
                            {openSection === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-3 pb-4 space-y-2 pl-4 border-l border-primary/20 ml-1">
                                        {section.links.map((link, idx) => (
                                            <Link 
                                                key={idx} 
                                                href={link.href} 
                                                className="block text-sm text-gray-500 hover:text-white hover:translate-x-1 transition-all duration-300"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light tracking-wide">
            <p>© 2025 AutoGuru Australia Pty Ltd. All rights reserved.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-6">
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                
                {/* Crafted By */}
                <div className="flex items-center gap-1 group cursor-default pl-4 md:border-l border-white/10">
                    <span>Crafted with</span>
                    <Heart className="w-3 h-3 text-red-900 fill-red-900 group-hover:text-red-500 group-hover:fill-red-500 group-hover:scale-110 transition-all duration-300" />
                    <span>by AIMP</span>
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

