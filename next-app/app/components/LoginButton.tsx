"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";

const LoginButton = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  // Fetch the role of the user synchronously inside useEffect
  useEffect(() => {
    const fetchRole = async () => {
      if (status === "authenticated" && session?.user.id) {
        try {
          const response = await axios.get(`/api/users/${session.user.id}`);
          const role = response.data.role;

          // Set the user role
          setUserRole(role);

          // Redirect based on role
          if (role === "ADMIN") {
            console.log("----> this is admin: ", role);
            router.replace("/admin"); // Prevent back navigation
          } else {
            console.log("----> this is regular user: ", role);
            router.replace("/"); // Prevent back navigation
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchRole(); // Call the async function
  }, [status, session, router]);

  return (
    <>
      {status === "loading" && (
        <span className="loading loading-dots loading-sm"></span>
      )}
      {status === "authenticated" && session && (
        <div className="flex items-center ml-5">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <img
                  src={
                    session.user?.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  width={500}
                  height={500}
                  alt="user avatar"
                  className="w-6 h-6 rounded-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-5 w-52 p-2 shadow"
            >
              <li>
                <Link href="/user/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/user/list">Saved</Link>
              </li>
              <li>
                <Link href="/user/contribution">My Contribution</Link>
              </li>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" className="btn btn-ghost">
          Login
        </Link>
      )}
    </>
  );
};

export default LoginButton;
