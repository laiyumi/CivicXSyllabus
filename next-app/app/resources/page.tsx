import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";
import { Category } from "@prisma/client";

// parameter passed in from the URL query string
interface Props {
  searchParams: { category: Category["name"] | "" };
}

const ResourcesPage = async ({ searchParams }: Props) => {
  console.log(searchParams.category);

  return (
    <>
      <ResourceFilter />
      {/* display all resources from the db  */}
      <Suspense fallback={<p>Loading...</p>}>
        <ResourcesGrid selectedCategory={searchParams.category} />
      </Suspense>
    </>
  );
};

export default ResourcesPage;
