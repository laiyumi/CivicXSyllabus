import React, { Suspense } from "react";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const ResourcesPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Resources</h1>
      <p>Sort order by: {sortOrder}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default ResourcesPage;
