"use client";

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = process.env.REACT_APP_SITE_KEY!;

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken, email }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Password reset link has been sent to your email.");
      } else {
        setError("Captcha verification failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-center font-normal">
              Reset your password
            </h1>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex flex-col gap-6">
            <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Email</span>
                <input type="text" className="input input-bordered w-full" />
              </label>
              {/* Google reCAPTCHA */}
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />

              <button type="submit" className="btn btn-primary my-4">
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
