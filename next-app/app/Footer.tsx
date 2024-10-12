import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 bg-slate-100 p-9">
      <div className="flex justify-evenly">
        <Link href="/" className="algin-left flex-none mr-5">
          Civic X Syllabus
        </Link>
        <Link href="/privacy" className="mr-5">
          Privacy
        </Link>
        <Link href="/contact" className="mr-5">
          Contact
        </Link>
      </div>
      <p className="text-center">
        © 2024 by Civic X Syllabus. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
