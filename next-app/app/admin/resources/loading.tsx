import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

const LoadingResourcePage = () => {
  const resources = [1, 2, 3, 4, 5];

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Resources</h1>
      <div className="flex justify-between pb-5">
        <Link className="btn btn-primary" href="/admin/resources/new">
          Create New Resource
        </Link>
      </div>
      <table className="table table-zebra table-pin-rows ">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="w-3/10">Title</th>
            <th className="w-2/10">Source</th>
            <th className="w-1/10">Published</th>
            <th className="w-3/10 hidden md:table-cell">Excerpt</th>
            {/* <th className="w-2/10 hidden md:table-cell">Link</th> */}
            <th className="w-1/10"></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {resources.map((resouce) => (
            <tr key={resouce}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-square h-12 w-12">
                      <Skeleton />
                    </div>
                  </div>
                  <div className="font-bold">
                    <Skeleton />
                  </div>
                </div>
              </td>
              {/* resource title */}
              <td>
                <Skeleton />
              </td>
              {/* source name */}
              <td>
                <Skeleton />
              </td>
              {/* published */}
              <td>
                <Skeleton />
              </td>
              {/* excerpt */}
              <td>
                <Skeleton />
              </td>
              {/* buttons */}
              <td className="flex gap-2">
                <Skeleton />
                <Skeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingResourcePage;
