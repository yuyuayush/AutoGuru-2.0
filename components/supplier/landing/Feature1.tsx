"use client";

import Image from "next/image";

export default function SupplierFeaturesSection() {
  return (
    <section className="supplier-features-wrapper">

      {/* CAR IMAGE */}
      <div className="supplier-features-image-wrap">
        <Image
          src="/SupplierLandingAsset/carLandingPage.jpg"
          alt="Car"
          width={1800}
          height={900}
          className="supplier-features-image"
        />
      </div>

      {/* TITLE */}
      <h2 className="supplier-features-heading">
        A COMPLETE SOLUTION TO <span>GROW</span> YOUR BUSINESS
      </h2>

      {/* FEATURES GRID */}
      <div className="supplier-features-grid">

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">One simple membership fee</h3>
            </div>
            <p className="supplier-feature-text">
              Pay a single subscription fee and zero commission on all AutoGuru
              retail marketplace bookings.
            </p>
          </div>
        </div>

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">Set your own pricing</h3>
            </div>
            <p className="supplier-feature-text">
              Enjoy complete control over your pricing. You can even set customised
              pricing for different days.
            </p>
          </div>
        </div>

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">Quote & book customers 24/7</h3>
            </div>
            <p className="supplier-feature-text">
              Our tech instantly quotes customers online 24/7 for you, based on
              your pricing.
            </p>
          </div>
        </div>

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">Attract new customers</h3>
            </div>
            <p className="supplier-feature-text">
              Easily collect great reviews from verified customers. Reviews are the
              perfect way to attract new customers!
            </p>
          </div>
        </div>

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">Flexible Payments</h3>
            </div>
            <p className="supplier-feature-text">
              Increase conversion with flexible payment options Afterpay, Humm, and
              Zip. Available online and in-store.
            </p>
          </div>
        </div>

        <div className="supplier-feature-box">
          <div className="supplier-feature-icon"></div>
          <div>
            <div className="supplier-feature-title-wrap">
              <span className="supplier-feature-bullet">▢</span>
              <h3 className="supplier-feature-title">Fleet work</h3>
            </div>
            <p className="supplier-feature-text">
              Access tens of thousands of fleet customers through AutoGuru's fleet
              partnerships.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
