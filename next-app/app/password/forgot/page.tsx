"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/request-reset", {
        email,
        type: "byEmail",
      });
      setMessage(
        "Please check your email for the reset code. If not found, please check your spam folder."
      );
      setIsSent(true);
    } catch (error: any) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

  const submitRestCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/verify-reset", {
        email,
        resetToken: resetCode,
      });

      setIsVerified(true);
      router.push(`/password/reset?email=${email}&token=${resetCode}`);
    } catch (error) {
      console.log(error);
      setError("Error verifying reset code.");
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

          <div className="flex flex-col gap-6 items-center">
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
              {!error && message && (
                <div role="alert" className="alert">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{message}</span>
                </div>
              )}
            </form>
            {error && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          {isSent && (
            <form
              className="flex flex-col w-72 gap-4"
              onSubmit={submitRestCode}
            >
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Reset Code</span>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <button type="submit" className="btn btn-primary my-4">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
