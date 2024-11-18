import { Metadata } from "next";
import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";

const ResourcesPage = () => {
  return (
    <>
      <div>
        <ResourceFilter />
        <Suspense fallback={<p>Loading...</p>}>
          <ResourcesGrid />
        </Suspense>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Civic X Syllabus - Resources",
  description: "View all resources",
};

export default ResourcesPage;
