import Link from "next/link";
import React from "react";
import SearchBar from "./components/SearchBar";
import MarqueeDemo from "./components/MarqueeDemo";

const HeroSection = () => {
  return (
    // <div className="grid grid-cols-12 bg-slate-200 py-20">
    //   <div className="col-start-4 col-span-6 flex flex-col gap-8 items-center">
    //     <h1 className="text-center">Your Roadmap to Civic Innovation</h1>
    //     <h2 className="text-lg text-center">
    //       Your go-to platform for building foundational civic innovation
    //       knowledge. <br />
    //       Our platform curates high-quality resources searchable by resource
    //       type and topic.
    //     </h2>
    //     <div className="w-full">
    //       <SearchBar />
    //       <MarqueeDemo />
    //     </div>
    //   </div>
    // </div>

    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/hannah-busing-Zyx1bK9mqmA-unsplash.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
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
