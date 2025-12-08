"use client";

import Image from "next/image";

export default function Feature2() {
  return (
    <section className="supplier-section feature2-wrapper reduce-gap">
      {/* TOP TEXT SECTION */}
      <div className="feature2-top">
        <h2 className="feature2-title">
          QUOTE <span className="gold-text">AND BOOK</span> CUSTOMERS WHILE<br />
          YOU'RE SLEEPING!
        </h2>

        <p className="feature2-description">
          Our instant quote feature allows you to quote and book customers 24/7.
          Your business will be available to customers at all times, increasing your
          opportunity to secure more work.
        </p>

        {/* Car Silhouette */}
        <div className="feature2-car-line">
          <Image
            src="/SupplierLandingAsset/carLandingPage2.jpg"
            alt="Car outline"
            width={600}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* LOWER CARD SECTION */}
      <div className="feature2-card">
        <div className="feature2-card-inner">

          {/* PHONE IMAGE */}
          <div className="feature2-phone">
            <Image
              src="/SupplierLandingAsset/phoneLandingImage.jpg"
              alt="Phone mock"
              width={300}
              height={600}
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="feature2-card-text">
            <h3 className="feature2-card-title">
              <span className="gold-text">STAND OUT</span> WITH A BIGGER ONLINE<br />
              PRESENCE.
            </h3>

            <p className="feature2-card-description">
              Our instant quote feature allows you to quote and book customers 24/7.
              Your business will be available to customers at all times, increasing your
              opportunity to secure more work.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
