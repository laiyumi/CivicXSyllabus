"use client";

import Link from "next/link";
import LoginButton from "./components/LoginButton";

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 p-5 ">
        <div className="navbar-start">
          <Link href="/" className="w-24">
            <img src="/new-logo.png" alt="site logo" />
          </Link>
        </div>
        <div className="navbar-center">
          <Link href="/resources" className="btn btn-ghost">
            Resources
          </Link>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              How to Use
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/build-my-syllabus">Use Cases</Link>
              </li>
              <li>
                <Link href="/build-my-syllabus/before-you-begin">
                  Civic 101
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
          {/* <Link href="/policy-teams" className="btn btn-ghost">
            Policy Teams
          </Link> */}
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
          <Link href="/add-a-resource" className="btn btn-success mr-2">
            Add a Resource
          </Link>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
