"use client";

import React from "react";
import Microlink from "@microlink/react";

const page = () => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition ease-in-out delay-100 duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none w-fit">
        <Microlink
          url="https://www.linkedin.com/pulse/what-civic-x-syllabus-civicxsyllabus-huwoc"
          lazy
          size="large"
          className="rounded-xl border-transparent border-0 w-full"
        />
      </div>
    </div>
  );
};

export default page;


