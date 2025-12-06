"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, Focus, Gauge, Wind, SunSnow, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    id: number;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    side: "left" | "right";
    x: number;
    y: number;
}

const FEATURES: Feature[] = [
    {
        id: 1,
        title: "V8 Biturbo",
        subtitle: "Engine & Power",
        icon: Zap,
        side: "left",
        x: 22,
        y: 55,
    },
    {
        id: 2,
        title: "Carbon Ceramic",
        subtitle: "Braking System",
        icon: Shield,
        side: "left",
        x: 22,
        y: 75,
    },
    {
        id: 3,
        title: "Matrix Laser",
        subtitle: "Vision & Light",
        icon: Focus,
        side: "left",
        x: 8,
        y: 52,
    },
    {
        id: 4,
        title: "Adaptive Air",
        subtitle: "Suspension",
        icon: Gauge,
        side: "right",
        x: 82,
        y: 75,
    },
    {
        id: 5,
        title: "Active Aero",
        subtitle: "Aerodynamics",
        icon: Wind,
        side: "right",
        x: 94,
        y: 40,
    },
    {
        id: 6,
        title: "Climate Control",
        subtitle: "Interior Comfort",
        icon: SunSnow,
        side: "right",
        x: 52,
        y: 45,
    },
];

interface LineCoords {
    [key: number]: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
}

export default function WhyChooseUs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [lineCoords, setLineCoords] = useState<LineCoords>({});

    const updateLines = () => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newCoords: LineCoords = {};

        FEATURES.forEach((feature) => {
            const card = document.getElementById(`card-${feature.id}`);
            const dot = document.getElementById(`dot-${feature.id}`);

            if (card && dot) {
                const cardRect = card.getBoundingClientRect();
                const dotRect = dot.getBoundingClientRect();

                const startX =
                    feature.side === "left"
                        ? cardRect.right - containerRect.left
                        : cardRect.left - containerRect.left;

                const startY = cardRect.top - containerRect.top + cardRect.height / 2;

                const endX = dotRect.left - containerRect.left + dotRect.width / 2;
                const endY = dotRect.top - containerRect.top + dotRect.height / 2;

                newCoords[feature.id] = { startX, startY, endX, endY };
            }
        });

        setLineCoords(newCoords);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".fade-in-up",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
            );

            gsap.fromTo(
                ".car-wrapper",
                { scale: 0.9, opacity: 0, filter: "blur(10px)" },
                {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power2.out",
                    delay: 0.2,
                    onUpdate: updateLines,
                    onComplete: updateLines,
                }
            );
        }, containerRef);

        const observer = new ResizeObserver(() => updateLines());
        if (containerRef.current) observer.observe(containerRef.current);
        window.addEventListener("resize", updateLines);

        return () => {
            ctx.revert();
            observer.disconnect();
            window.removeEventListener("resize", updateLines);
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen bg-[#050505] text-white flex items-center justify-center py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,30,30,1)_0%,_rgba(0,0,0,1)_100%)]" />

            <div
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto px-6 z-10"
            >
                <div className="text-center mb-16 fade-in-up">
                    <p className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase mb-3">
                        Technical Specification
                    </p>
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
                        The Architecture
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4 relative">
                    <div className="w-full md:w-[25%] flex flex-col gap-6 order-2 md:order-1 z-20">
                        {FEATURES.filter((f) => f.side === "left").map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                feature={feature}
                                isActive={activeId === feature.id}
                                onHover={(id) => {
                                    setActiveId(id);
                                    updateLines();
                                }}
                            />
                        ))}
                    </div>

                    <div className="w-full md:w-[50%] relative order-1 md:order-2 car-wrapper">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-[#D4AF37] blur-[120px] opacity-10 rounded-full"></div>

                        <div className="relative w-full">
                            <Image
                                src="/Highlight_Image.png"
                                alt="Car Chassis"
                                width={1200}
                                height={600}
                                className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                                priority
                                onLoadingComplete={updateLines}
                            />

                            {FEATURES.map((feature) => (
                                <div
                                    key={feature.id}
                                    id={`dot-${feature.id}`}
                                    className={`absolute w-3 h-3 md:w-4 md:h-4 -ml-2 -mt-2 rounded-full border border-white/50 cursor-pointer z-20 transition-all duration-300 ${activeId === feature.id
                                            ? "bg-[#D4AF37] border-[#D4AF37] scale-125 shadow-[0_0_15px_#D4AF37]"
                                            : "bg-black/40 hover:bg-white backdrop-blur-sm"
                                        }`}
                                    style={{ top: `${feature.y}%`, left: `${feature.x}%` }}
                                    onMouseEnter={() => {
                                        setActiveId(feature.id);
                                        updateLines();
                                    }}
                                    onMouseLeave={() => setActiveId(null)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-[25%] flex flex-col gap-6 order-3 z-20">
                        {FEATURES.filter((f) => f.side === "right").map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                feature={feature}
                                isActive={activeId === feature.id}
                                onHover={(id) => {
                                    setActiveId(id);
                                    updateLines();
                                }}
                            />
                        ))}
                    </div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block overflow-visible z-10">
                        {FEATURES.map((feature) => {
                            const coords = lineCoords[feature.id];
                            if (!coords || activeId !== feature.id) return null;

                            const isLeft = feature.side === "left";
                            const elbowX = isLeft ? coords.startX + 50 : coords.startX - 50;

                            return (
                                <path
                                    key={feature.id}
                                    d={`M ${coords.startX} ${coords.startY} L ${elbowX} ${coords.startY} L ${coords.endX} ${coords.endY}`}
                                    fill="none"
                                    stroke="#D4AF37"
                                    strokeWidth="1.5"
                                    className="drop-shadow-[0_0_3px_rgba(212,175,55,0.5)]"
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>
        </section>
    );
}

interface FeatureCardProps {
    feature: Feature;
    isActive: boolean;
    onHover: (id: number | null) => void;
}

const FeatureCard = ({ feature, isActive, onHover }: FeatureCardProps) => {
    return (
        <div
            id={`card-${feature.id}`}
            onMouseEnter={() => onHover(feature.id)}
            onMouseLeave={() => onHover(null)}
            className={`
        relative p-4 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md group
        ${isActive
                    ? "bg-white/10 border-[#D4AF37]/40 translate-x-2"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }
        ${feature.side === "right" && isActive ? "-translate-x-2" : ""}
      `}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${isActive
                            ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                            : "border-white/20 text-gray-400"
                        }`}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <feature.icon className="w-5 h-5" />
                    </svg>
                </div>
                <div>
                    <h4
                        className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-300"
                            }`}
                    >
                        {feature.title}
                    </h4>
                    <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider">
                        {feature.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};