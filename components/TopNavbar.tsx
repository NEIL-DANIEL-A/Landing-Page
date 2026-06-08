"use client";

import React from "react";
import Image from "next/image";
import { useSidebar } from "@/lib/sidebar-context";
import { Menu } from "lucide-react";

export default function TopNavbar() {
  const { setIsOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 w-full h-[70px] glass-panel-dark border-b border-white/20 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
      {/* Left side: Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -ml-2 rounded-xl text-brand-teal hover:bg-black/5 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right side: Logo and branding */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 shadow-md shadow-brand-blue/20 flex items-center justify-center">
          <Image src="/brand-logo.svg" alt="Cloud Enthusiasts logo" width={28} height={28} />
        </div>
        <span className="font-display font-bold text-lg bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Cloud Enthusiasts
        </span>
      </div>
    </header>
  );
}
