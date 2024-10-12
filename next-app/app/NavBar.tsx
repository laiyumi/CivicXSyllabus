import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-slate-100 p-5">
        <Link href="/" className="flex-none mr-5">
          Civic X Syllabus
        </Link>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/resources" className="mr-5">
                Resources
              </Link>
            </li>
            <li>
              <details>
                <summary className="mr-5">Build my Syllabus</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link href="/build-my-syllabus">Overview</Link>
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
                    <Link href="/build-my-syllabus/get-to-work">
                      Get to Work
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/add-a-resource" className="mr-5">
                Add a Resources
              </Link>
            </li>
            <li>
              <Link href="/about" className="mr-5">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href="/sign-up" className="btn btn-ghost mr-5">
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
