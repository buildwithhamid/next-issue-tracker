"use client";

import { useView } from "@/app/ContextFiles/ViewContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Calendar,
  Home,
  Inbox,
  LogOut,
  Settings,
  useAuth,
} from "./imports";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/Services/authService";

export function AppSidebar() {
  const { email, username, setEmail, setUserId, setUsername } = useAuth();
  const { view } = useView();
  const router = useRouter();

  const isAdmin = email === "task-manager@admn.com";

  const items = (isAdmin && view === "Admin")
    ? [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Inbox", url: "#", icon: Inbox },
        { title: "Profile", url: "#", icon: Settings },
        { title: "Logout", url: "/login", icon: LogOut },
      ]
    : [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Profile", url: "#", icon: Calendar },
        { title: "Logout", url: "/login", icon: LogOut },
      ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      setEmail("");
      setUserId("");
      setUsername("");
      router.replace("/views/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex flex-col justify-center items-center gap-2">
                  <Image className="h-25 w-25" src="/woman.png" alt="" />
                  <p className="text-gray-700">{username}</p>
                  <p className="text-gray-700">{email}</p>
                </div>
              </SidebarMenuItem>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-2 w-full">
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
