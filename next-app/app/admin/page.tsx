import React from "react";
import AdminDashboardNavBar from "./NavBar";
import DashboardSummary from "./DashboardSummary";
import { useSession } from "next-auth/react";

const AdminHomePage = () => {
  return (
    <>
      <DashboardSummary />
    </>
  );
};

export default AdminHomePage;
