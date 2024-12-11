import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const LoginButton = () => {
  const { status, data: session } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  // console.log("session data--------", session);

  // useEffect(() => {
  //   if (status === "authenticated" && !hasRedirected) {
  //     router.push("/admin");
  //     setHasRedirected(true);
  //   }
  // }, [status, router, hasRedirected]);

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
                <Link href="/api/auth/signout">Logout</Link>
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
