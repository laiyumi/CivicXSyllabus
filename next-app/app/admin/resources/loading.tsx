import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingResourcePage = () => {
  const resources = [1, 2, 3, 4, 5];

  return (
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
          <th className="w-1/10">Published</th>
          <th className="w-3/10 hidden md:table-cell">Excerpt</th>
          <th className="w-2/10 hidden md:table-cell">Link</th>
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
                <div>
                  <Skeleton />
                  <div className="text-sm opacity-50">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </td>
            <td>
              <Skeleton />
            </td>
            <td className="hidden md:table-cell">
              <Skeleton />
            </td>
            <th className="hidden md:table-cell">
              <Skeleton />
            </th>
            <th>
              <button className="btn btn-outline btn-s">Edit</button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadingResourcePage;
