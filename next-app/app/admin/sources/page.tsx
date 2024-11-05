import React from "react";
import SourcesTable from "./SourcesTable";
import SearchBar from "@/app/components/SearchBar";

const AdminSourcesPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1>Sources</h1>
      <div className="flex justify-between pb-5">
        <div className="w-1/3">
          <SearchBar />
        </div>
      </div>
      <SourcesTable />
    </div>
  );
};

export default AdminSourcesPage;
