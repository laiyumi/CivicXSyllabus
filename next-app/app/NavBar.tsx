"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginButton from "./components/LoginButton";
import ThemeController from "./components/ThemeController";
import ThemeLogo from "./components/ThemeLogo";

const NavBar = () => {
  return (
    <>
      <div className="navbar p-5 text-base-content bg-base-300 relative z-10">
        <div data-test="site-logo" className="navbar-start">
          <ThemeLogo />
        </div>
        {/* small screen */}
        <div data-test="hamburger-menu" className="dropdown dropdown-end">
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
            className="menu menu-sm dropdown-content bg-base-300 text-base-content rounded-box z-20 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/resources" data-test="resources-link">
                Resources
              </Link>
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
                  <Link href="/about/who-we-serve">Who We Serve</Link>
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <Link
                href="/add-a-resource"
                data-test="add-a-resource-link-mobile"
                className="btn btn-primary xs:btn-sm"
              >
                Add a Resource
              </Link>
            </li>
          </ul>
        </div>
        {/* large screen */}
        <div
          data-test="horizontal-menu"
          className="navbar-center hidden md:flex"
        >
          <Link
            data-test="resources-link"
            href="/resources"
            className="btn btn-ghost text-base-content"
          >
            Resources
          </Link>
          <div className="dropdown dropdown-hover">
            <div
              data-test="how-to-use-link-large-screen"
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1"
            >
              How to Use
            </div>
            <ul
              tabIndex={0}
              className="text-base-content dropdown-content menu bg-base-300 rounded-box z-20 w-52 p-2 shadow"
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
            <div
              data-test="about-link-large-screen"
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1"
            >
              About
            </div>
            <ul
              tabIndex={0}
              className="text-base-content dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/about/team">Our Team</Link>
              </li>
              <li>
                <Link href="/about/who-we-serve">Who We Serve</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <Link
            data-test="add-a-resource-link"
            href="/add-a-resource"
            className="btn btn-primary mr-2 btn-outline md:btn-md  md:flex hidden"
          >
            Add a Resource
          </Link>
          <LoginButton />
          <ThemeController />
        </div>
      </div>
    </>
  );
};

export default NavBar;
