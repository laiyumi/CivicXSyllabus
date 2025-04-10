import Link from "next/link";
import React from "react";
import SearchBar from "./components/SearchBar";
import MarqueeDemo from "./components/MarqueeDemo";

const HeroSection = () => {
  return (
    <div
      className="relative [min-height:75dvh]"
      style={{
        backgroundImage: "url(/hannah-busing-Zyx1bK9mqmA-unsplash.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label="A close-up of a group of hands stacked together in a show of unity and teamwork, with colorful sweaters in the background."
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main content section with padding */}
      <div className="relative z-[5] px-4 pt-8 xs:py-12 sm:pt-16 md:pt-20 lg:pt-24 text-center text-neutral-content">
        <div className="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 xs:gap-5 sm:gap-6 lg:gap-8 items-center">
            <h1
              data-test="hero-heading"
              className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-center"
            >
              Your Roadmap to Civic Innovation
            </h1>
            <p className="text-sm xs:text-base md:text-lg text-center">
              Your go-to platform for building foundational civic innovation
              knowledge.
              <span className="hidden xs:inline">
                <br />
              </span>
              <span className="xs:hidden"> </span>
              Our platform curates high-quality resources searchable by resource
              type and topic.
            </p>
            <div className="w-full xs:w-11/12 sm:w-4/5 md:w-5/6 lg:w-full">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee section outside the content constraints */}
      <div className="relative z-[5] w-full overflow-x-hidden bg-opacity-60">
        <MarqueeDemo />
      </div>
    </div>
  );
};

export default HeroSection;
