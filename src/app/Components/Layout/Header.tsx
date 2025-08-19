"use client"; 

import { DropdownToggle } from "./DropDownToggle";
import { ModeToggle, SidebarToggleButton, useAuth } from "./imports";
import Image from "next/image";

export default function Header() {
  const {email} = useAuth();
  return (
    <header className="p-4 flex items-center justify-between border-b">
      <SidebarToggleButton />
      <div className="flex justify-between items-center gap-3">
        <Image className="h-12 w-12" src="/expense.png" alt="" />
        <h1 className="text-2xl font-semibold">Tasks Manager</h1>
      </div>
      <div className="flex items-center gap-4">
        {email === "task-manager@admn.com" &&
        <DropdownToggle />}
        <ModeToggle />
      </div>
    </header>
  );
}