"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/reset-password", { token, newPassword });
      setMessage("Password reset successful! You can now log in.");
      router.push("/login");
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">Reset Password</h1>
          </div>

          <div className="flex flex-col gap-6">
            <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Email</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
