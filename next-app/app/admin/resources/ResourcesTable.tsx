import React from "react";
import prisma from "../../../prisma/client";
import delay from "delay";
import Link from "next/link";

interface ResourcesTableProps {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  imageUrl: string;
  published: boolean;
  sourceId: string;
}

const ResourcesTable = async () => {
  // fetch resources from endpiont
  const response = await fetch("http://localhost:3000/api/resources", {
    next: { revalidate: 10 },
  });

  // convert response to json
  const resources = await prisma.post.findMany({
    include: {
      source: {
        select: {
          name: true,
        },
      },
    },
  });

  await delay(2000);

  return (
    <div className="overflow-x-auto">
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
            <tr key={resouce.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-square h-12 w-12">
                      <img src={resouce.imageUrl} alt="post thumbnail" />
                    </div>
                  </div>
                  <div className="font-bold">{resouce.title}</div>
                </div>
              </td>
              <td> {resouce.source.name}</td>
              <td>
                {resouce.published ? (
                  <input type="checkbox" className="toggle" defaultChecked />
                ) : (
                  <input type="checkbox" className="toggle" />
                )}
              </td>
              <td className="hidden md:table-cell">{resouce.excerpt}</td>
              <td>
                <Link
                  href={`/admin/resources/${resouce.id}`}
                  className="btn btn-outline btn-s"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default ResourcesTable;
