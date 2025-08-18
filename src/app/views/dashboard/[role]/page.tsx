"use client";

import { useParams } from "next/navigation";
import { useView } from "@/app/ContextFiles/ViewContext";
import AdminDashboard from "@/app/Components/MainContent/AdminDashboard";
import UserDashboard from "@/app/Components/MainContent/UserDashboard";


export default function DashboardRolePage() {
  const params = useParams<{ role: string }>();
  const { view } = useView();

  if (params.role === "Admin" && view === "Admin") {
    console.log("We are on Admin dashboard")
    return <AdminDashboard />;
  }
    console.log("We are on User dashboard")
  return <UserDashboard />;
}
