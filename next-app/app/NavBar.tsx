import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex bg-slate-100 p-5">
      <Link href="/" className="mr-5">
        Civic X Syllabus
      </Link>
      <Link href="/resources" className="mr-5">
        Resources
      </Link>
      <Link href="/build-my-syllabus" className="mr-5">
        Build my Syllabus
      </Link>
      <Link href="/add-a-resource" className="mr-5">
        Add a Resources
      </Link>
      <Link href="/about" className="mr-5">
        About
      </Link>
    </div>
  );
};

export default NavBar;
