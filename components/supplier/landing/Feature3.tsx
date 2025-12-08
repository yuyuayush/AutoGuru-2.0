"use client";

import Image from "next/image";
import Link from "next/link";

export default function Feature3() {
  return (
    <section className="supplier-section feature3-wrapper">
      <div className="feature3-container">

        {/* LEFT SIDE TEXT */}
        <div className="feature3-content">
          <h2 className="feature3-title">
            ATTRACT NEW CUSTOMERS ONLINE AND GROW<br />
            YOUR BUSINESS – <span className="gold-text">PAY ZERO COMMISSION</span>
          </h2>

          <p className="feature3-description">
            Join thousands of Australian mechanics who are growing their business with AutoGuru.
            We send you qualified bookings, not just leads.
          </p>

          {/* BUTTONS */}
          <div className="feature3-buttons">
            <Link href="/supplier/login" className="btn-dark">
              Login
            </Link>

            <Link href="/supplier/signup" className="btn-gold">
              Create Account
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="feature3-image">
          <Image
            src="/SupplierLandingAsset/mechanic.png"
            alt="Mechanics"
            width={480}
            height={480}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}
