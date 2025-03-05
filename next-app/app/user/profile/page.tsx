"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FadeOutMessage from "@/app/components/FadeOutMessage";

const UserProfilePage = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const userId = session?.user?.id || "";

  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

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

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put("/api/users/update-password", {
        password,
      });
      setMessage("Password updated successfully!");
      setIsPasswordEditing(false);
    } catch (error: any) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

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
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 relative items-center">
            <label className="input input-bordered flex items-center gap-4 w-64">
              Name
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
            <div className="absolute left-full pl-4">
              {isNameEditing ? (
                <div className="flex gap-2">
                  <button className="btn btn-md" onClick={handleNameChange}>
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
                  className="btn btn-md"
                  onClick={() => setIsNameEditing(true)}
                >
                  Change
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-4 relative items-center">
            <label className="input input-bordered flex items-center gap-4 w-64">
              Password
              {isPasswordEditing ? (
                <>
                  <input
                    type="password"
                    className="text-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="text-gray-600"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              ) : (
                <span>********</span>
              )}
            </label>
            <div className="absolute left-full pl-4">
              {isPasswordEditing ? (
                <div className="flex gap-2">
                  <button className="btn btn-md" onClick={handlePasswordChange}>
                    Save
                  </button>
                  <button
                    className="btn btn-md"
                    onClick={() => setIsPasswordEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-md"
                  onClick={() => setIsPasswordEditing(true)}
                >
                  Change
                </button>
              )}
            </div>
          </div>
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
