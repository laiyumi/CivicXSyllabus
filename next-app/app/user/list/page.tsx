import React from "react";
import Link from "next/link";

const UserSavedResourcesPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl">My List</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 shadow-xl col-span-1">
            <figure className="w-full h-[300px]">
              <img
                src="https://placehold.co/600x400"
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex flex-wrap gap-3">
                <div className="badge badge-secondary">Civic Design</div>
              </div>
              <h2 className="card-title">
                Handbook on Using Administrative Data for Research and
                Evidence-based Policy serve
              </h2>
              <p className="text-sm">
                The Handbook serves as a go-to reference for researchers seeking
                to use administrative data and for data providers looking to
                make their data accessible for research.
              </p>
              <div className="flex gap-3 mt-1">
                <div className="badge badge-outline">Platform</div>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link href="/" className="btn btn-sm btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSavedResourcesPage;
