"use client";

import React from "react";
import GlassCard from "./GlassCard";
import { announcements } from "@/data/announcements";
import { Bell, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Announcements() {
  return (
    <GlassCard className="flex flex-col h-full border border-white/20 announcements-bg" hoverEffect={false}>
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
            <Bell className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-display">
            Community Announcements
          </h3>
        </div>
        <span className="text-sm text-foreground/50 font-medium">
          {announcements.length} updates
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[360px] custom-scrollbar space-y-4">
        {announcements.map((ann, idx) => {
          return (
            <div
              key={ann.id}
              className={cn(
                "group p-3 rounded-xl hover:bg-black/[0.02] transition-colors relative cursor-pointer",
                idx !== announcements.length - 1 && "border-b border-black/[0.04] pb-4"
              )}
            >

              <h4 className="text-[16px] font-bold text-foreground group-hover:text-brand-orange transition-colors flex items-center gap-1">
                <span>{ann.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </h4>

              <p className="text-sm text-foreground/75 leading-relaxed mt-1">
                {ann.description}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
