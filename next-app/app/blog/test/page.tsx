import React from "react";

const page = () => {
  return (
    <div>
      <div className="min-h-screen">
        <header className="border-b border-base-300">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-base-content">
                Our Blog
              </h1>
              <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
                Insights and thoughts on Civic Innovation
              </p>
            </div>
          </div>
        </header>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          async
        ></script>
        <div
          className="elfsight-app-47d3bd8d-aaf9-4e61-834a-618c2ec7ffc2"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default page;
