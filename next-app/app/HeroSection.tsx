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
      <div className="hero-content text-neutral-content text-center py-32">
        <div className="max-w-4xl">
          <div className="col-start-4 col-span-6 flex flex-col gap-8 items-center">
            <h1 className="text-center">Your Roadmap to Civic Innovation</h1>
            <h2 className="text-lg text-center">
              Your go-to platform for building foundational civic innovation
              knowledge. <br />
              Our platform curates high-quality resources searchable by resource
              type and topic.
            </h2>
            <div className="w-full">
              <SearchBar />
              <MarqueeDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
