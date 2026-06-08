"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverEffect?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  style,
  onClick,
  hoverEffect = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      style={style}
      className={cn(
        "glass-panel rounded-[22px] overflow-hidden p-6 text-foreground border border-white/25 transition-shadow duration-300",
        onClick && "cursor-pointer select-none",
        className
      )}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.4)",
            }
          : undefined
      }
      whileTap={onClick && hoverEffect ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
}
