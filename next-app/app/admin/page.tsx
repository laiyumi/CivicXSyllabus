import React from "react";
import AdminDashboardNavBar from "./NavBar";
import DashboardSummary from "./DashboardSummary";
import { useSession } from "next-auth/react";

const AdminHomePage = () => {
  // session is always non-null inside this component
  const { data: session } = useSession();

  return (
    <>
      <DashboardSummary />
    </>
  );
};

AdminHomePage.auth = {
  role: "ADMIN",
  unauthorized: "/",
};

export default AdminHomePage;
