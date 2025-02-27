"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { ResetPasswordSchema } from "../../validationSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/ErrorMessage";

type ResetPasswordFormInputs = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setMessage("Invalid request. Redirecting...");
      setTimeout(() => router.push("/password/forgot"), 3000);
    }
  }, [email, token, router]);

  const onSubmit = handleSubmit(async (data) => {
    const requestData = {
      email: email,
      resetToken: token,
      newPassword: data.newPassword,
      confirmedNewPassword: data.confirmedNewPassword,
    };

    console.log(requestData);

    try {
      const { data } = await axios.post(
        "/api/auth/reset-password",
        requestData
      );

      setMessage("Password has been reset successfully!");
      setError("");

      setTimeout(() => router.push("/api/auth/signin"), 3000); // redirect after 3 seconds
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.error || "An unexpected error occurred.");
      setMessage("");
    }
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">Reset Password</h1>
          </div>
          {/* display input error */}
          {/* {error && (
            <div role="alert" className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Error alert icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )} */}

          <div className="flex flex-col gap-6 items-center">
            <form className="flex flex-col w-72 gap-4" onSubmit={onSubmit}>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">New Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register("newPassword")}
                />
                <p className="text-xs text-slate-600">
                  Password must be at least 6 characters, including one
                  uppercase, one lowercase, one number, and one special
                  character.
                </p>
                <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Re-enter New Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register("confirmedNewPassword")}
                />
              </label>
              <ErrorMessage>
                {errors.confirmedNewPassword?.message}
              </ErrorMessage>
              <button type="submit" className="btn btn-primary my-4">
                Reset Password
              </button>
            </form>
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
            )}{" "}
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
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
