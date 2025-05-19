"use client";

import Link from "next/link";
import React from "react";
import ThemeLogo from "./components/ThemeLogo";

const Footer = () => {
  return (
    <footer className="footer p-10 text-base-content bg-base-300 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0">
      <div className="text-center md:text-left justify-items-center md:justify-items-start">
        <div className="flex justify-center md:justify-start">
          <ThemeLogo />
        </div>
        <p className="mt-2">
          Copyright © {new Date().getFullYear()} - All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-end md:self-end items-center md:ml-auto">
        <Link href="/privacy" className="link link-hover">
          Privacy Policy
        </Link>
        <span className="hidden xs:inline">|</span>
        <Link href="/terms-of-use" className="link link-hover">
          Terms of Use
        </Link>
        <span className="hidden xs:inline">|</span>
        <Link
          href={`mailto:contact@civicxsyllabus.org?`}
          target="_blank"
          className="link link-hover"
          rel="noopener noreferrer"
        >
          Contact Us
        </Link>
        <span className="hidden xs:inline">|</span>
        <Link href="https://www.linkedin.com/company/civicxsyllabus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="fill-current"
          >
            <title id="linkedin-title">LinkedIn logo</title>
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
