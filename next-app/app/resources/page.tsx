import { Suspense } from "react";
import ResourceFilter from "./ResourceFilter";
import ResourcesGrid from "./ResourcesGrid";

// sortOrder is a parameter passed in from the URL query string
interface Props {
  searchParams: { sortOrder: string };
}

const ResourcesPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <ResourceFilter />
      {/* display all resources from the db  */}
      <Suspense fallback={<p>Loading...</p>}>
        <ResourcesGrid />
      </Suspense>

      {/* <p>Sort order by: {sortOrder}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense> */}
    </>
  );
};

export default ResourcesPage;
