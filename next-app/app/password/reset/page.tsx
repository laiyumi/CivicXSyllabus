"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const ResetPasswordPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setMessage("Invalid request. Redirecting...");
      setTimeout(() => router.push("/password/forgot"), 3000);
    }
  }, [email, token, router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/reset-password", {
        email,
        resetToken: token,
        newPassword,
        confirmedNewPassword,
      });

      setMessage(data.message);
      setTimeout(() => router.push("/api/auth/signin"), 3000); // Redirect to login after success
    } catch (error) {
      console.log(error);
      setMessage("Error resetting password.");
    }
  };

  if (!email || !token) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">Reset Password</h1>
          </div>

          <div className="flex flex-col gap-6">
            <form
              className="flex flex-col w-72 gap-4"
              onSubmit={handleResetPassword}
            >
              <label className="form-control w-full flex gap-2">
                <span className="text-m">New Password</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
                <p className="text-xs text-slate-600">
                  Password must be at least 6 characters, including one
                  uppercase, one lowercase, one number, and one special
                  character.
                </p>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Re-enter New Password</span>
                <input
                  type="password"
                  value={confirmedNewPassword}
                  onChange={(e) => setConfirmedNewPassword(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
              </label>
              <button type="submit" className="btn btn-primary my-4">
                Reset Password
              </button>
            </form>
            {message && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
