"use client"; 

import { Menu, useSidebar } from "./imports";

export function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar} className="md:hidden p-2">
      <Menu />
    </button>
  );
}
