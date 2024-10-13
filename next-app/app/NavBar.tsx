import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 p-5">
        <div className="navbar-start">
          <Link href="/">Civic X Syllabus</Link>
        </div>
        <div className="navbar-center">
          <Link href="/resources" className="btn btn-ghost">
            Resources
          </Link>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              Build my Syllabus
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/build-my-syllabus">Overview</Link>
              </li>
              <li>
                <Link href="/before-you-begin">Before You Begin</Link>
              </li>
              <li>
                <Link href="/build-partnerships">Build Partnerships</Link>
              </li>
              <li>
                <Link href="/get-to-work">Get to Work</Link>
              </li>
            </ul>
          </div>
          <Link href="/add-a-resource" className="btn btn-ghost">
            Add a Resource
          </Link>
          <Link href="/about" className="btn btn-ghost">
            About
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/sign-up" className="btn mr-5">
            Sign Up
          </Link>
          <Link href="/login" className="btn btn-ghost mr-5">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
