"use client";

import React from "react";
import Link from "next/link";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  iconBgClass: string;
  href?: string;
  onClick?: () => void;
  delay?: number;
  style?: React.CSSProperties;
}

export default function StatsCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconClass,
  iconBgClass,
  href,
  onClick,
  delay = 0,
  style,
}: StatsCardProps) {
  const CardContent = () => (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-sm font-medium text-foreground/60 tracking-wide uppercase">
          {label}
        </span>
        <span className="text-3xl font-extrabold text-foreground font-display tracking-tight mt-1">
          {value}
        </span>
        <span className="text-xs font-semibold text-foreground/50 mt-1 flex items-center gap-1.5 truncate">
          {subtext}
        </span>
      </div>

      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
        iconBgClass
      )}>
        <Icon className={cn("w-5 h-5", iconClass)} />
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div className="block w-full">
        <GlassCard onClick={onClick} delay={delay} style={style} className="border border-white/30 cursor-pointer">
          <CardContent />
        </GlassCard>
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} className="block w-full">
        <GlassCard delay={delay} style={style} className="border border-white/30 cursor-pointer">
          <CardContent />
        </GlassCard>
      </Link>
    );
  }

  return (
    <GlassCard delay={delay} style={style} hoverEffect={false} className="border border-white/20 select-none">
      <CardContent />
    </GlassCard>
  );
}
