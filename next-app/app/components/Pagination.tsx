"use client";

import React from "react";
import chevron_right from "../../public/chevron_right.svg";
import chevron_left from "../../public/chevron_left.svg";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({
  itemCount,
  pageSize,
  currentPage = 1,
}: PaginationProps) => {
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
    <div className="join">
      <button
        disabled={currentPage === 1}
        className="join-item btn"
        onClick={() => changePage(currentPage - 1)}
      >
        <Image src={chevron_left} alt="chevron_left" />
      </button>
      <button className="join-item btn">
        Page {currentPage} of {pageCount}
      </button>
      <button
        disabled={currentPage === pageSize}
        className="join-item btn"
        onClick={() => changePage(currentPage + 1)}
      >
        <Image src={chevron_right} alt="chevron_right" />
      </button>
    </div>
  );
};

export default Pagination;
