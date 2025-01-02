import Link from "next/link";
import React from "react";
import SearchBar from "./components/SearchBar";
import MarqueeDemo from "./components/MarqueeDemo";

const HeroSection = () => {
  return (
    <div
      className="hero "
      style={{
        backgroundImage: "url(/hannah-busing-Zyx1bK9mqmA-unsplash.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label="A close-up of a group of hands stacked together in a show of unity and teamwork, with colorful sweaters in the background."
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center sm:py-20 lg:py-32">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="flex flex-col lg:gap-8 sm:gap-6 items-center">
            <h1 className="sm:text-2xl md:text-2xl lg:text-3xl text-center">
              Your Roadmap to Civic Innovation
            </h1>
            <p className="md:text-md lg:text-lg text-center">
              Your go-to platform for building foundational civic innovation
              knowledge. <br />
              Our platform curates high-quality resources searchable by resource
              type and topic.
            </p>
            <div className="lg:w-full sm:w-3/4">
              <SearchBar />
            </div>
            <MarqueeDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
