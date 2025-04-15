import React from "react";
import SourcesTable from "./SourcesTable";
import SearchBar from "@/app/components/SearchBar";

const AdminSourcesPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Sources</h1>
      <SourcesTable />
    </div>
  );
};

export default AdminSourcesPage;
