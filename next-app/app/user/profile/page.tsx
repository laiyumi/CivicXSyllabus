"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserProfilePage = () => {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState("");

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  // fetch the role of the user
  useEffect(() => {
    axios
      .get(`api/users/${session?.user?.id}`)
      .then((response) => {
        const setUserRole = response.data.role;
        // console.log("---->user role: ", response.data.role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [session]);

  const userName = session?.user?.name || "Unknown User";
  const userEmail = session?.user?.email || "Unknown Email";

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
        <label className="input input-bordered flex items-center gap-2">
          Account Type
          <input type="text" className="grow" value={userRole} />
        </label>
      </div>
    </>
  );
};

export default UserProfilePage;
