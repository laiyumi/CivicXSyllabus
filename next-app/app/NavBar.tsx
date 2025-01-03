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
        {/* small screen */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost md:hidden xs:btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <title id="linkedin-title">Hamburger menu icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <a> How to Use</a>
              <ul className="p-2">
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
            </li>
            <li>
              <a>About</a>
              <ul className="p-2">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/about/team">Our Team</Link>
                </li>
                <li>
                  <Link href="/about/use-cases">Who We Serve</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* large screen */}
        <div className="navbar-center hidden md:flex">
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
                <Link href="/about/use-cases">Who We Serve</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <Link
            href="/add-a-resource"
            className="btn btn-primary mr-2 btn-outline md:btn-md xs:btn-sm "
          >
            Add a Resource
          </Link>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
