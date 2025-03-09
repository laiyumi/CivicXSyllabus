"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useState({
    search: "",
  });

  const onSearch = () => {
    const newSearchParams = {
      search: searchText,
    };

    setSearchParams(newSearchParams);

    const queryString = Object.keys(newSearchParams)
      .filter(
        (key) => newSearchParams[key as keyof typeof newSearchParams] !== ""
      )
      .map(
        (key) =>
          `${key}=${newSearchParams[key as keyof typeof newSearchParams]}`
      )
      .join("&");

    router.push(`/resources?${queryString}`);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch();
      }
    }
  };

  return (
    <div className="w-full flex gap-2">
      <label className="input input-bordered flex items-center gap-2 w-full bg-base-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="h-4 w-4 opacity-70  fill-base-content"
        >
          <title>Search icon</title>
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          aria-label="Search"
          id="search-input"
          name="search"
          type="search"
          className="grow text-base-content"
          placeholder="Search anything"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            handleEnterKey(e);
          }}
        />
      </label>
      <button className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
