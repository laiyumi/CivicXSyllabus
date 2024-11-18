"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated" && !hasRedirected) {
  //     router.push("/admin");
  //     setHasRedirected(true);
  //   }
  // }, [status, router, hasRedirected]);

  return (
    <>
      <div className="navbar bg-base-100 p-5 ">
        <div className="navbar-start">
          <Link href="/" className=" font-serif text-2xl ">
            Civic X Syllabus
          </Link>
        </div>
        <div className="navbar-center">
          <Link href="/resources" className="btn btn-ghost">
            Resources
          </Link>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              Educators
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/build-my-syllabus">Build a Syllabus</Link>
              </li>
              <li>
                <Link href="/build-my-syllabus/before-you-begin">
                  Before You Begin
                </Link>
              </li>
              <li>
                <Link href="/build-my-syllabus/build-partnerships">
                  Build Partnerships
                </Link>
              </li>
              <li>
                <Link href="/build-my-syllabus/get-to-work">Get to Work</Link>
              </li>
            </ul>
          </div>
          <Link href="/policy-teams" className="btn btn-ghost">
            Policy Teams
          </Link>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              About
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/about/team">Our Team</Link>
              </li>
              <li>
                <Link href="/about/use-cases">Use Cases</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <Link href="/add-a-resource" className="btn btn-ghost">
            Add a Resource
          </Link>
          {status === "loading" && (
            <span className="loading loading-dots loading-sm"></span>
          )}
          {status === "authenticated" && (
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-8 rounded-full ml-5">
                  <img
                    src={session.user!.image!}
                    width={500}
                    height={500}
                    alt="user avatar"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>
              <Link href="/api/auth/signout" className="btn ml-5">
                Sign Out
              </Link>
            </div>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin" className="btn btn-ghost mr-5">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
