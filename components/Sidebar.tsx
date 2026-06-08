"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSidebar } from "@/lib/sidebar-context";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Award,
  Milestone,
  MessageSquare,
  Bot,
  Calendar,
  Cloud,
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Events", href: "/events", icon: CalendarDays },
  { name: "My Tickets", href: "/tickets", icon: Ticket },
  { name: "Certifications", href: "/certifications", icon: Award },
  { name: "Roadmap", href: "/roadmap", icon: Milestone },
  { name: "Community Chat", href: "/chat", icon: MessageSquare },
  { name: "Newsbot", href: "/newsbot", icon: Bot },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "AWS Services", href: "/aws", icon: Cloud },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-white/10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange text-white text-xl font-bold shadow-md shadow-brand-orange/20">
          N
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-white truncate text-base font-display">Neil Daniel A</span>
          <span className="text-xs text-white/60 truncate">Cloud Builder</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden ml-auto p-1.5 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "group flex items-center gap-3.5 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-300 relative overflow-hidden",
                isActive
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/75 hover:text-white hover:bg-white/5"
              )}
            >
              {/* Active Orange Border indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={cn(
                "w-[18px] h-[18px] transition-transform duration-300",
                isActive ? "text-brand-orange scale-110" : "text-white/60 group-hover:scale-110 group-hover:text-white"
              )} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => alert("Signing out...")}
          className="flex w-full items-center gap-3.5 px-4 py-3.5 rounded-xl text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        >
          <LogOut className="w-[18px] h-[18px] text-brand-orange group-hover:translate-x-0.5 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (fixed) */}
      <aside className="fixed top-0 left-0 z-40 hidden md:block w-[260px] h-screen bg-gradient-to-b from-brand-teal to-brand-teal-secondary border-r border-white/10 shadow-xl shadow-brand-teal/10">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (with dynamic state overlay) */}
      <div className={cn(
        "fixed inset-0 z-50 md:hidden transition-all duration-500",
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}>
        {/* Backdrop overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        />

        {/* Sidebar Drawer Container */}
        <div className={cn(
          "absolute top-0 bottom-0 left-0 w-[260px] bg-gradient-to-b from-brand-teal to-brand-teal-secondary shadow-2xl transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
