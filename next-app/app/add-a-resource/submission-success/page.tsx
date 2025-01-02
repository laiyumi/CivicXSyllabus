"use client";

import React from "react";
import Link from "next/link";

const SubmitssionSuccessPage = () => {
  return (
    <div className="my-10r">
      <h1 className="text-xl font-bold text-center">Submitted Successfully</h1>
      <div className="grid grid-cols-12">
        <div className="justify-self-center w-full flex flex-col gap-6 col-start-4 col-span-6">
          <div className="justify-self-center w-full flex flex-col gap-4 my-6">
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Success alert icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Thank you for contributing to Civic X Syllabus. <br />
                We&apos;ll reach out with the updates.
              </span>
              <Link href="/" className="btn btn-ghost btn-primary">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitssionSuccessPage;
