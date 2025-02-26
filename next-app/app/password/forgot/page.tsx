"use client";

import React, { useState } from "react";
import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

// const siteKey = process.env.REACT_APP_SITE_KEY!;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/forgot-password", { email });
      setMessage(data.message);
    } catch (error) {
      setMessage("Error sending reset email.");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">
              Forgot Password
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <button type="submit" className="btn btn-primary my-4">
                Send Reset Code
              </button>
            </form>
            {message && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
