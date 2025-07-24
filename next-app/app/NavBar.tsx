"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginButton from "./components/LoginButton";
import ThemeController from "./components/ThemeController";
import ThemeLogo from "./components/ThemeLogo";

const NavBar = () => {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [howToUseDropdownOpen, setHowToUseDropdownOpen] = useState(false);

  const handleAboutDropdownToggle = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const handleHowToUseDropdownToggle = () => {
    setHowToUseDropdownOpen(!howToUseDropdownOpen);
  };

  const handleHowToUseDropdownClose = () => {
    setHowToUseDropdownOpen(false);
  };

  const handleAboutDropdownClose = () => {
    setAboutDropdownOpen(false);
  };

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
            <li>
              <Link href="/blog" data-test="blog-link">
                Blog
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
          <div className="dropdown">
            <div
              data-test="how-to-use-link-large-screen"
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 flex items-center gap-1"
              onClick={handleHowToUseDropdownToggle}
            >
              How to Use
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${
                  howToUseDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`text-base-content dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow ${
                howToUseDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  href="/build-my-syllabus"
                  onClick={handleHowToUseDropdownClose}
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/build-my-syllabus/before-you-begin"
                  onClick={handleHowToUseDropdownClose}
                >
                  Civic 101
                </Link>
              </li>
              <li>
                <Link
                  href="/build-my-syllabus/build-partnerships"
                  onClick={handleHowToUseDropdownClose}
                >
                  Build Partnerships
                </Link>
              </li>
              <li>
                <Link
                  href="/build-my-syllabus/get-to-work"
                  onClick={handleHowToUseDropdownClose}
                >
                  Get to Work
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div
              data-test="about-link-large-screen"
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 flex items-center gap-1"
              onClick={handleAboutDropdownToggle}
            >
              About
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${
                  aboutDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`text-base-content dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ${
                aboutDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link href="/about" onClick={handleAboutDropdownClose}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/team" onClick={handleAboutDropdownClose}>
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about/who-we-serve"
                  onClick={handleAboutDropdownClose}
                >
                  Who We Serve
                </Link>
              </li>
            </ul>
          </div>
          <Link
            data-test="blog-link"
            href="/blog"
            className="btn btn-ghost text-base-content"
          >
            Blog
          </Link>
          {/* <Link
            data-test="ai-link"
            href="/ai"
            className="btn btn-ghost text-base-content"
          >
            AI
          </Link> */}
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
