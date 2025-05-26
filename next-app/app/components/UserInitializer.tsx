"use client";

import { useSession } from "next-auth/react";
import { useUserStore } from "@/app/stores/useUserStore";
import { useEffect } from "react";
import axios from "axios";

// This component handles user initialization without rendering anything
const UserInitializer = () => {
  const { data: session, status } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const initializeUser = async () => {
      if (status === "authenticated" && session?.user?.id && !user) {
        try {
          console.log("Initializing user data for:", session.user.id);
          const response = await axios.get(`/api/users/${session.user.id}`);
          setUser(response.data);
          console.log("User data initialized:", response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else if (status === "unauthenticated" && user) {
        console.log("Clearing user data on logout");
        clearUser();
      }
    };

    // Only run if session status is determined (not loading)
    if (status !== "loading") {
      initializeUser();
    }
  }, [session, status, user, setUser, clearUser]);

  // This component doesn't render anything
  return null;
};

export default UserInitializer;
