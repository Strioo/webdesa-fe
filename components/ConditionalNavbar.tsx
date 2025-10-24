"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import DockNavbar from "./DockNavbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar di dashboard, login, dan register pages
  const shouldHideNavbar = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/login') || 
                           pathname.startsWith('/register');

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <>
      <Navbar />
      <DockNavbar />
    </>
  );
}