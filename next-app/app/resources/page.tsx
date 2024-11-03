import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";
import { Category, Tag } from "@prisma/client";

// parameter passed in from the URL query string
interface Props {
  searchParams: {
    category: Category["name"] | "";
    tag: Tag["name"] | "";
    order: string;
    q: string;
  };
}

const ResourcesPage = ({ searchParams }: Props) => {
  // for testing
  console.log(searchParams.category);
  console.log(searchParams.tag);
  console.log(searchParams.order);
  console.log(searchParams.q);

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10">
        <ResourceFilter />
        {/* display all resources from the db  */}
        <Suspense fallback={<p>Loading...</p>}>
          <ResourcesGrid
            selectedCategory={searchParams.category}
            selectedTag={searchParams.tag}
            sortOrder={searchParams.order}
            searchText={searchParams.q}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ResourcesPage;
