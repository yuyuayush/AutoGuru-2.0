"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/homepage/Logo";
import SupplierLoginForm from "@/components/form/SupplierLoginForm";

const LoginPage = () => {
  return (
    <div className="login-page flex min-h-screen w-full bg-black">

      {/* LEFT SIDE HERO SECTION */}
      <div className="left-hero relative w-1/2 h-screen overflow-hidden">
        <Image
          src="/LoginAssets/Autoguru.jpg"
          alt="Luxury car"
          fill
          priority
          className="object-cover"
        />

        {/* HERO TEXT */}
        <div className="hero-text absolute bottom-20 left-16 z-20">
          <h1 className="text-white text-5xl font-bold tracking-widest">
            AUTO<span className="text-amber-400">GURU</span>
          </h1>
          <p className="text-gray-300 text-lg mt-2 tracking-wide">
            SERVICE. REPAIR. EXCELLENCE.
          </p>
        </div>

        {/* Dark gradient overlay for premium look */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* RIGHT SIDE LOGIN SECTION */}
      <div className="right-login w-1/2 flex items-center justify-center p-10">
        <div className="login-container w-full max-w-md">

          {/* TITLE */}
          <h2 className="login-title text-3xl font-extrabold text-white">
            SIGN IN TO YOUR ACCOUNT
          </h2>

          <p className="login-subtitle text-gray-300 mt-2 text-sm">
            Or{" "}
            <Link href="/supplier/signup" className="signup-link text-blue-400 hover:underline">
              create a new account
            </Link>
          </p>

          {/* LOGIN CARD */}
          <div className="login-card mt-8 rounded-xl">

            < SupplierLoginForm/>

            {/* DIVIDER */}
            <div className="flex items-center my-8">
              <div className="grow border-t border-gray-600"></div>
              <span className="mx-3 text-gray-400 text-sm">or continue with</span>
              <div className="grow border-t border-gray-600"></div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="social-buttons flex gap-4">

              {/* GOOGLE BTN */}
              <button className="social-btn google flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4">
                  <path fill="#EA4335" d="M488 261.8c0-17.8-1.6-35-4.7-51.6H249v97.7h135.8c-5.9 31.7-23.7 58.5-50.4 76.4l81.3 63.1c47.5-43.7 74.3-108.2 74.3-185.6z"/>
                  <path fill="#34A853" d="M249 492c67 0 123-22.3 164-60.5l-81.3-63.1c-22.6 15-51.6 23.9-82.7 23.9-63.6 0-117.4-42.8-136.7-100.5H30v62.9C71.4 439 153.7 492 249 492z"/>
                  <path fill="#FBBC04" d="M112.3 292.8c-5.1-15.3-8-31.6-8-48.3 0-16.7 2.9-33 8-48.3v-62.9H30C10.7 164 0 204.5 0 244.5S10.7 325 30 364.1l82.3-62.9z"/>
                  <path fill="#4285F4" d="M249 97.1c36.3 0 69 12.5 94.7 36.9l71-71C371.4 23.2 314 0 249 0 153.7 0 71.4 53 30 132.9l82.3 62.9C131.6 140 185.4 97.1 249 97.1z"/>
                </svg>
                Google
              </button>

              {/* FACEBOOK BTN */}
              <button className="social-btn facebook flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                  <path fill="#1877F2" d="M279.14 288l14.22-92.66h-88.91V127.74c0-25.35 12.42-50.06 52.24-50.06H295V6.26S268.43 0 243.83 0c-73.22 0-121.17 44.38-121.17 124.72V195.3H48v92.66h74.66V512h91.72V288z"/>
                </svg>
                Facebook
              </button>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
