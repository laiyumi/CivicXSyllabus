"use client";

import { DeleteAccountButton } from "@/app/components/DeleteAccountButton";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useNotifications } from "../../contexts/NotificationContext";
import { ResetPasswordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ResetPasswordFormInputs = z.infer<typeof ResetPasswordSchema>;

const UserProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const { showNotification, clearAllNotifications } = useNotifications();

  const { data: session, status, update } = useSession();

  const router = useRouter();

  const userId = session?.user?.id || "";

  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const [password, setPassword] = useState("********");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [name, setName] = useState("");
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [nameJustUpdated, setNameJustUpdated] = useState(false);

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

        if (userData.password == null) {
          setIsGoogleUser(true);
        }

        // Only update the name if it hasn't been recently updated
        if (!nameJustUpdated) {
          setName(userData.name);
        }
        setUserEmail(userData.email);
        setUserImage(
          userData.image ||
            "https://webgradients.com/public/webgradients_png/024%20Near%20Moon.png"
        );
        setJoinDate(
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(userData.createdAt))
        );
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [userId, nameJustUpdated]);

  const handleNameChange = async () => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {
        newUsername: name,
      });

      if (response.status == 200) {
        setMessage("Name updated successfully!");
        setIsNameEditing(false);
        setNameJustUpdated(true);

        // Update the session with the new name
        await update({
          name: name,
        });

        // Reset the flag after a short delay to allow future fetches
        setTimeout(() => {
          setNameJustUpdated(false);
        }, 2000);

        // Force a re-render by updating the key
        setKey(key + 1);
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

  const handleDeleteAccount = async () => {
    console.log("Deleting account...");
  };

  // Show notifications when error or message changes
  useEffect(() => {
    if (error) {
      clearAllNotifications();
      showNotification(error, "error");
      // Clear the error state after showing notification
      setTimeout(() => setError(""), 3000);
    }
  }, [error, showNotification, clearAllNotifications]);

  useEffect(() => {
    if (message) {
      clearAllNotifications();
      showNotification(message, "success");
      // Clear the message state after showing notification
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message, showNotification, clearAllNotifications]);

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
          <span className="text-base-content">{userEmail}</span>
        </div>
        <div className="flex items-center gap-4">
          Member since
          <span className="badge badge-outline badge-primary">{joinDate}</span>
        </div>

        {/* Conditionally render password field */}
        {!isGoogleUser ? (
          <>
            <div className="flex flex-col gap-8 ">
              {/* Edit Name */}
              <div className="flex gap-4 relative items-center">
                <label className="input input-bordered flex items-center gap-4 w-72 grow">
                  <span>Name</span>
                  {isNameEditing ? (
                    <input
                      type="text"
                      className="text-base-content"
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
                  <div className="relative flex gap-4 items-start">
                    <div className="w-72 flex flex-col gap-4">
                      <label className="input input-bordered flex items-center gap-4 w-72 first-line:grow">
                        <span className="whitespace-nowrap">
                          {isPasswordEditing ? "New Password" : "Password"}
                        </span>

                        <div className="flex flex-col gap-2">
                          <input
                            type="password"
                            className="text-gray-600 w-full"
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
                        <ErrorMessage>
                          {errors.newPassword.message}
                        </ErrorMessage>
                      )}
                    </div>

                    <div className="absolute left-full ml-4">
                      {isPasswordEditing ? (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-md btn-primary"
                            type="submit"
                          >
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
                          className="text-gray-600 w-full"
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
            {/* <div>
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
            </div> */}
            <DeleteAccountButton id={userId} />
          </>
        ) : (
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {" "}
              You signed in with your Google account. If you want to manage your
              security settings, please visit your Google Account settings.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
