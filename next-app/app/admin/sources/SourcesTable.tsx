import prisma from "@/prisma/client";
import { Post, Source } from "@prisma/client";
import React from "react";

interface SourceProps {
  id: string;
  name: string;
  posts: string[]; // related posts id
}

const SourcesTable = async () => {
  const sources = await prisma.source.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      Posts: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  console.log(sources);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* <th>Saved Posts</th> */}
          </tr>
        </thead>
        <tbody>
          {sources.map((source: Source) => (
            <tr key={source.id}>
              <td>{source.id}</td>
              <td>{source.name}</td>
              {/* <td>2</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SourcesTable;
