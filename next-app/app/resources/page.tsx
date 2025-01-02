import { Metadata } from "next";
import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";

const ResourcesPage = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-normal">
          Explore Our Resources
        </h1>
        <ResourceFilter />
        <Suspense fallback={<p>Loading...</p>}>
          <ResourcesGrid />
        </Suspense>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Resources - Civic X Syllabus",
  description: "View all resources",
};

export default ResourcesPage;
