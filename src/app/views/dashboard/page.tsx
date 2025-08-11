"use client"; 

import { useView } from "@/app/ContextFiles/ViewContext";
import { AdminDashboard, useAuth, UserDashboard } from "../imports";

export default function Dashboard() {
  const { email } = useAuth();
  const { view } = useView()

  if (email === "task-manager@admn.com" && view==="Admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
