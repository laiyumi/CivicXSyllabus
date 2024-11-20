"use client";

import React from "react";
import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  const userName = session.user?.name || "Unknown User";
  const userEmail = session.user?.email || "Unknown Email";

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl">My Profile</h2>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" value={userName} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" className="grow" value={userEmail} />
        </label>
      </div>
    </>
  );
};

export default UserProfilePage;
