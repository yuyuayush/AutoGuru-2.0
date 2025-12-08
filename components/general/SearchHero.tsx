"use client";

import React from "react";
import Image from "next/image";
import SearchHeroForm from "@/components/form/SearchHeroForm";

interface SearchHeroProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    backgroundImage: string;
}

export default function SearchHero({ title, subtitle, backgroundImage }: SearchHeroProps) {
    return (
        <div className="relative w-full">
            {/* Hero Section with Background */}
            <div className="relative h-[650px] w-full flex flex-col items-center justify-center text-center px-4">


                {/* Background Image */}
                {/* <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div> */}

                {/* Content */}
                <div className="relative z-10 w-full max-w-6xl   flex flex-col items-center">

                    {/* Title & Subtitle */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide text-white w-full lg:text-left  ">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 font-light  lg:text-left">
                            {subtitle}
                        </p>
                    </div>

                    {/* Search Form Component */}
                    <SearchHeroForm />
                </div>
            </div>

            {/* Features Bar - Below the hero and form */}
            <div className="pt-12 pb-12 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg">Australia's #1 booking site</h3>
                            <p className="text-sm ">for car services & car repairs</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg ">Book now, pay later</h3>
                            <p className="text-sm ">Interest-free payments</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg ">Transparent prices</h3>
                            <p className="text-sm ">no surprises</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
