"use client";

import React from "react";
import HomeServiceHero from "@/components/home-service/HomeServiceHero";
import ServicesOffered from "@/components/homepage/ServicesOffered";
import { Wrench, Clock, MapPin, ShieldCheck } from "lucide-react";

const HomeServicePage = () => {
  return (
    <div className="min-h-screen">
      <HomeServiceHero />

      {/* How it Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-400">Simple, transparent, and hassle-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-10 h-10 text-[#bf953f]" />,
                title: "1. Book Online",
                description: "Select your service and preferred pickup time."
              },
              {
                icon: <MapPin className="w-10 h-10 text-[#bf953f]" />,
                title: "2. We Pick Up",
                description: "Our driver picks up your car from your home or office."
              },
              {
                icon: <Wrench className="w-10 h-10 text-[#bf953f]" />,
                title: "3. We Service",
                description: "Expert mechanics service your car at our workshop."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-[#bf953f]" />,
                title: "4. We Drop Off",
                description: "We deliver your car back to you, fully serviced."
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-[#111] border border-white/10 rounded-xl hover:shadow-[0_0_20px_rgba(191,149,63,0.1)] transition-all group">
                <div className="mb-4 p-4 bg-[#bf953f]/10 rounded-full group-hover:bg-[#bf953f]/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesOffered />
    </div>
  );
};

export default HomeServicePage;