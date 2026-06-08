"use client";

import React from "react";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

export default function ChatPage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <GlassCard className="max-w-md w-full text-center flex flex-col items-center justify-center p-8 border border-white/25 shadow-xl" hoverEffect={false}>
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-5">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground font-display tracking-tight mb-2">
          Community Chat
        </h1>
        <p className="text-sm text-foreground/60 leading-relaxed mb-6">
          Connect in real-time with other cloud builders. Participate in open-topic channels, discuss tech stacks, or collaborate on AWS hackathons.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold hover:-translate-y-0.5 transition-all shadow-md shadow-brand-orange/15">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </GlassCard>
    </div>
  );
}
