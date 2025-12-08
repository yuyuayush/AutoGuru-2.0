"use client";

import Link from "next/link";

export default function SupplierLanding() {
  return (
    <div className="min-h-[600px] supplier-hero-bg flex items-start justify-center px-10 py-12 pt-24">

      <div className="flex w-full max-w-7xl">

        {/* LEFT SIDE */}
        <div className="w-1/2 flex flex-col justify-center pr-20">

          <h1 className="text-white text-5xl font-extrabold leading-tight">
            JOIN AUSTRALIA'S #1
            <br />
            BOOKING SITE FOR
            <br />
            <span className="text-amber-400">AUTO REPAIRERS.</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-md leading-relaxed">
            Become a member of a network that's recognised and trusted
            nationally by Aussie car owners.
          </p>

          {/* METRICS */}
          <div className="mt-16 grid grid-cols-4 gap-8">

            <div className="text-center">
              <div className="metric-number">9,000+</div>
              <div className="metric-label mt-1">AUTO REPAIRERS</div>
            </div>

            <div className="text-center">
              <div className="metric-number">4 M+</div>
              <div className="metric-label mt-1">WEBSITE VISITS / YEAR</div>
            </div>

            <div className="text-center">
              <div className="metric-number">$140 M</div>
              <div className="metric-label mt-1">QUOTED ONLINE</div>
            </div>

            <div className="text-center">
              <div className="metric-number">160,000+</div>
              <div className="metric-label mt-1">REVIEWS</div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-1/2 flex justify-end items-center">

          <div className="supplier-card w-full max-w-sm p-10">

            <h2 className="text-white text-lg font-semibold tracking-wider">
              JOIN THE NETWORK
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Login or Create an account to register as a supplier.
            </p>

            <Link
              href="/supplier/login"
              className="mt-6 dark-outline-btn w-full block text-center py-2 rounded-md"
            >
              Login
            </Link>

            <Link
              href="/supplier/signup"
              className="mt-4 gold-btn w-full block text-center py-2 rounded-md font-medium"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
