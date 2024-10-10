"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AddAResourcePage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Add A Resource Page</h1>
      <button
        className="btn btn-primary"
        onClick={() => router.push("/resources")}
      >
        Create
      </button>
    </div>
  );
};

export default AddAResourcePage;
