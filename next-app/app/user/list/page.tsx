"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CreateListModal from "./CreateListModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Prisma } from "@prisma/client";

type User = Prisma.UserGetPayload<{
  include: {
    lists: true;
  };
}>;

const UserSavedResourcesPage = () => {
  // get the user email from the session
  const { data: session } = useSession();

  // Store the user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data by email
        const response = await axios.get(`/api/users/${session?.user.id}`);
        setUser(response.data);
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // While loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // When the user is not found
  if (!user) {
    return <p>User not found. Please log in with a valid account.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        {/* <h2 className="text-2xl">My List</h2> */}
        <div className="flex justify-center gap-8 w-full items-center ">
          <select className="select select-primary w-full max-w-xs">
            {user.lists.map((list) => (
              <option key={list.id}>{list.name}</option>
            ))}
          </select>
          <button className="btn btn-primary">Share the list</button>
          <CreateListModal userId={user.id} />
        </div>
        <div className="divider"></div>

        <div className="flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-2xl">Syllabus Materials</h2>
          <div className="text-l flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20px"
              className="text-red-600 fill-current"
            >
              <path d="M23.3 5.076a6.582 6.582 0 0 0-10.446-1.71L12 4.147l-.827-.753a6.52 6.52 0 0 0-5.688-1.806A6.47 6.47 0 0 0 .7 5.075a6.4 6.4 0 0 0 1.21 7.469l9.373 9.656a1 1 0 0 0 1.434 0l9.36-9.638A6.41 6.41 0 0 0 23.3 5.076"></path>
            </svg>{" "}
            1 resource saved
          </div>
        </div>

        <div className="grid grid-flow-row-dense grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 shadow-xl col-span-1">
            <figure className="w-full h-[300px]">
              <img
                src="https://res.cloudinary.com/djtnydk0h/image/upload/v1731604894/ydlzgjn9oavixedusvmm.png"
                className="object-cover"
              />
              <button
                className="btn btn-circle absolute top-5 right-5"
                onClick={() => alert("Remove from the list.")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
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
