"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      if (session?.user.id) {
        try {
          const response = await axios.get(`/api/users/${session.user.id}`);
          if (response.data.role === "ADMIN") {
            setUserRole("Admin");
          } else {
            setUserRole("Regular User");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchRole();
  }, [session?.user.id]);

  const userName = session?.user?.name || "Unknown User";
  const userEmail = session?.user?.email || "Unknown Email";
  const userImage =
    session?.user?.image ||
    "https://webgradients.com/public/webgradients_png/024%20Near%20Moon.png";

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">My Profile</h1>
        <img
          src={userImage}
          alt="user image"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col gap-8">
          <label className="input input-bordered flex items-center gap-4">
            Name
            <input type="text" className="text-gray-600" value={userName} />
          </label>
          <label className="input input-bordered flex items-center gap-4">
            Email
            <input type="text" className="text-gray-600" value={userEmail} />
          </label>
          <label className="input input-bordered flex items-center gap-4">
            Account Type
            <input type="text" className="text-gray-600" value={userRole} />
          </label>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
