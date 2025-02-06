"use client";

import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignInSchema } from "../../validationSchemas";
import Spinner from "../../components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignInFormInputs = z.infer<typeof SignInSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCsrfToken() {
      const token = await getCsrfToken();
      if (token === undefined) {
        console.error("Failed to retrieve CSRF token");
      } else {
        setCsrfToken(token);
      }
    }
    fetchCsrfToken();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("Invalid email or password");
        }
        console.log(error);
        setIsSubmitting(false);
        return;
      }

      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred on validation");
    }
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">Sign In</h1>
          </div>
          {/* display input error */}
          {error && (
            <div role="alert" className="alert alert-error mb-4 w-1/2">
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
          {/* Sign in form */}
          <div className="flex flex-col gap-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 w-72">
              {/* CSRF Token (Hidden Input) */}
              <input name="csrfToken" type="hidden" value={csrfToken || ""} />
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
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-4"
              >
                Sign In
              </button>
            </form>
            <div>
              <p className="text-center">
                Don&apos;t have an account yet?{" "}
                <Link href="/signup" className="text-blue-600 underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="divider">OR</div>

            {/* Google Sign-In Option */}
            <div>
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="btn btn-secondary w-full "
              >
                <div className="flex items-center justify-center gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>{" "}
                  </div>
                  Sign in with Google
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
