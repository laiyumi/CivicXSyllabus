"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import { CreateAccountSchema } from "../validationSchemas";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import axios from "axios";
import Link from "next/link";

type SignUpFormInputs = z.infer<typeof CreateAccountSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(CreateAccountSchema),
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      // send form data to the server
      await axios.post("/api/register", data);
      router.replace("/auth/signin");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred on the server.");
    }
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">Sign Up</h1>
          </div>
          {/* display input error */}
          {error && (
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
          )}
          <div className="flex flex-col gap-6">
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
              <span>All fields are required.</span>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col w-72 gap-4">
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Email</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("email")}
                />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
                <p className="text-xs text-slate-600">
                  Password must be at least 6 characters, including one
                  uppercase, one lowercase, one number, and one special
                  character.
                </p>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Confirmed Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  {...register("confirmedPassword")}
                />
                <ErrorMessage>{errors.confirmedPassword?.message}</ErrorMessage>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary my-4"
              >
                Create Account
                {isSubmitting && <Spinner />}
              </button>
              <p className="text-xs text-slate-600">
                By clicking &quot;Create Account&quot; above, you acknowledge
                that you have read, understood, and agree to Civic X
                Syllabus&apos;s{" "}
                <Link href="/privacy" className="text-blue-600">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
