"use client"; 
import ProtectedRoute from "@/app/utils/protectedRoute";
import { AppSidebar, Header, SidebarProvider } from "../imports";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          <div className="hidden md:block w-64 flex-shrink-0 border-r">
            <AppSidebar />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
