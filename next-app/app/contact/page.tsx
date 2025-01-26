"use client";

import React, { useState } from "react";
import Spinner from "../components/Spinner";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    console.log("onSubmit called!");
  };

  return (
    <div className="my-10">
      <h1 className="text-2xl text-center font-normal">Contact Us</h1>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-12">
          <div className="justify-self-center flex flex-col lg:gap-6 lg:col-start-4 lg:col-span-6 sm:gap-4 xs:gap-2 xs:col-start-2 xs:col-span-10">
            <div className="justify-self-center w-full flex flex-col gap-4 my-6">
              <p className="text-center">We&apos;re happy to hear from you!</p>
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 shrink-0"
                >
                  <title>Information icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Required field is mark with an asterisk.</span>
              </div>
            </div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Name *</span>
              <input type="text" className="input input-bordered w-full" />
              {/* <ErrorMessage>{errors.name?.message}</ErrorMessage> */}
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Email *</span>
              <input type="text" className="input input-bordered w-full" />
              {/* <ErrorMessage>{errors.email?.message}</ErrorMessage> */}
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Message *</span>
              <textarea className="textarea textarea-bordered h-24 text-base placeholder:text-m"></textarea>
              {/* <ErrorMessage>{errors.description?.message}</ErrorMessage> */}
            </label>
            <button
              disabled={isSubmitting}
              className="btn btn-primary"
              type="submit"
            >
              Send
              {isSubmitting && <Spinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
