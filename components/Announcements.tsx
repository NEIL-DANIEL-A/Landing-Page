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
          <h3 className="text-lg font-bold text-foreground font-display">
            Community Announcements
          </h3>
        </div>
        <span className="text-xs text-foreground/50 font-medium">
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
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide",
                  ann.tagColor === "orange" && "bg-brand-orange/10 text-brand-orange",
                  ann.tagColor === "blue" && "bg-brand-blue/10 text-brand-blue",
                  ann.tagColor === "green" && "bg-emerald-500/10 text-emerald-600",
                  ann.tagColor === "purple" && "bg-purple-500/10 text-purple-600"
                )}>
                  {ann.tag}
                </span>
                <span className="text-[11px] text-foreground/45 font-medium">
                  {ann.date}
                </span>
              </div>

              <h4 className="text-[14px] font-bold text-foreground group-hover:text-brand-orange transition-colors flex items-center gap-1">
                <span>{ann.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </h4>

              <p className="text-xs text-foreground/75 leading-relaxed mt-1">
                {ann.description}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
