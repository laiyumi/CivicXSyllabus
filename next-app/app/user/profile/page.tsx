"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FadeOutMessage from "@/app/components/FadeOutMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { z } from "zod";
import { set } from "date-fns";

type ResetPasswordFormInputs = z.infer<typeof ResetPasswordSchema>;

const UserProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const { data: session, status, update } = useSession();

  const router = useRouter();

  const userId = session?.user?.id || "";

  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const [password, setPassword] = useState("********");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [name, setName] = useState("");

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [key, setKey] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return; // Ensure we have a valid user ID
        const response = await axios.get(`/api/users/${userId}`);
        const userData = response.data;

        setName(userData.name);
        setUserEmail(userData.email);
        setUserImage(
          userData.image ||
            "https://webgradients.com/public/webgradients_png/024%20Near%20Moon.png"
        );
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleNameChange = async () => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {
        newUsername: name,
      });

      if (response.status == 200) {
        setMessage("Name updated successfully!");
        setIsNameEditing(false);

        // Fetch the updated user data
        const updatedUserResponse = await axios.get(`/api/users/${userId}`);
        const updatedUser = updatedUserResponse.data;
        setName(updatedUser.name);
        setKey(key + 1);

        // update the session object
        await update();
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

  const onClickChangePassword = () => {
    setIsPasswordEditing(true);
    setPassword("");
  };

  const handlePasswordChange = handleSubmit(async (data) => {
    const requestData = {
      email: userEmail,
      // resetToken: resetCode,
      newPassword: data.newPassword,
      confirmedNewPassword: data.confirmedNewPassword,
    };

    console.log(requestData);

    try {
      const { data } = await axios.post("/api/change-password", requestData);

      setMessage("Password has been reset successfully!");
      setError("");

      setPassword("");
      setConfirmedPassword("");
      setIsPasswordEditing(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.error || "An unexpected error occurred.");
      setMessage("");
    }
  });

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">My Profile</h1>
        <img
          src={userImage}
          alt="user image"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-center gap-4">
          Email
          <span className="text-gray-600">{userEmail}</span>
        </div>
        <div className="flex flex-col gap-8 ">
          <div className="flex gap-4 relative items-center">
            <label className="input input-bordered flex items-center gap-4 w-72 grow">
              <span>Name</span>
              {isNameEditing ? (
                <input
                  type="text"
                  className="text-gray-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <span>{name}</span>
              )}
            </label>
            <div className="absolute left-full ml-4">
              {isNameEditing ? (
                <div className="flex gap-2">
                  <button
                    className="btn btn-md btn-primary"
                    onClick={handleNameChange}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-md"
                    onClick={() => setIsNameEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-md btn-primary"
                  onClick={() => setIsNameEditing(true)}
                >
                  Change
                </button>
              )}
            </div>
          </div>

          {/* Edit password */}
          <div className="flex flex-col gap-8">
            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-8"
            >
              <div className="relative flex gap-4 items-center">
                <div className="w-72">
                  <label className="input input-bordered flex items-center gap-4  first-line:grow">
                    <span className="whitespace-nowrap">
                      {isPasswordEditing ? "New Password" : "Password"}
                    </span>

                    <div className="flex flex-col gap-2">
                      <input
                        type="password"
                        className="text-gray-600 flex-grow"
                        disabled={!isPasswordEditing}
                        placeholder={isPasswordEditing ? "" : "••••••••"}
                        {...register("newPassword")}
                        onFocus={(e) => {
                          if (!isPasswordEditing) {
                            e.target.blur(); // Prevents editing unless 'Change' is clicked
                          }
                        }}
                      />
                    </div>
                  </label>
                  {isPasswordEditing && errors.newPassword && (
                    <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                  )}
                </div>

                <div className="absolute left-full ml-4">
                  {isPasswordEditing ? (
                    <div className="flex gap-2">
                      <button className="btn btn-md btn-primary" type="submit">
                        Save
                      </button>
                      <button
                        className="btn btn-md"
                        onClick={() => {
                          setIsPasswordEditing(false);
                          setValue("newPassword", "");
                          setValue("confirmedNewPassword", "");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-md btn-primary"
                      onClick={() => {
                        setIsPasswordEditing(true);
                        setValue("newPassword", "");
                      }}
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>

              {isPasswordEditing && (
                <div className="flex flex-col gap-4 relative items-center">
                  <label className="input input-bordered flex items-center gap-4 w-72 grow">
                    <span className="whitespace-nowrap">
                      Confirmed Password
                    </span>
                    <input
                      type="password"
                      className="text-gray-600 flex-grow"
                      // value={confirmedPassword}
                      {...register("confirmedNewPassword")}
                    />
                  </label>
                  {isPasswordEditing && errors.confirmedNewPassword && (
                    <ErrorMessage>
                      {errors.confirmedNewPassword?.message}
                    </ErrorMessage>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
        <div>
          {error && (
            <FadeOutMessage
              key={key}
              message={error}
              type="error"
              onAnimationEnd={() => setError("")}
            />
          )}
          {message && (
            <FadeOutMessage
              key={key}
              message={message}
              type="success"
              onAnimationEnd={() => setMessage("")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
