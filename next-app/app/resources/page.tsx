import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";
import { Category, Tag } from "@prisma/client";
import Pagination from "../components/Pagination";

// parameter passed in from the URL query string
interface Props {
  searchParams: {
    category: Category["name"] | "";
    tag: Tag["name"] | "";
    order: string;
    q: string;
    page: string;
  };
}

const ResourcesPage = ({ searchParams }: Props) => {
  // for testing
  console.log(searchParams.category);
  console.log(searchParams.tag);
  console.log(searchParams.order);
  console.log(searchParams.q);
  console.log(searchParams.page);

  return (
    <>
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
        <div className="col-start-6 col-span-2 mt-16 mb-8">
          <Pagination
            itemCount={100}
            pageSize={10}
            currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
          />
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;
