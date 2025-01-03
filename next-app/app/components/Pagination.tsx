"use client";

import React from "react";
import chevron_right from "../../public/chevron_right.svg";
import chevron_left from "../../public/chevron_left.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount < 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
      <div className="hidden xs:flex flex-col gap-4 sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, itemCount)}
            </span>{" "}
            of <span className="font-medium">{itemCount}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {Array.from({ length: pageCount }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0 ${
                currentPage === pageCount ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
