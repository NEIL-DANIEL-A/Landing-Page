"use client";

import React from "react";
import { motion } from "framer-motion";
import { PointsProgressChart, ParticipationTrendChart, AchievementDistributionChart } from "@/components/AnalyticsCharts";
import RankingInsights from "@/components/RankingInsights";
import LeaderboardTable from "@/components/LeaderboardTable";
import StatsCard from "@/components/StatsCard";
import { Trophy, Award, Flame, Calendar, Sparkles, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LeaderboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 w-full"
    >
      {/* 1. Hero Section */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-black/5"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-foreground font-display tracking-tight flex items-center gap-2">
            <span>Leaderboard Analytics</span>
            <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            Track your progress, view detailed charts, and see community standings.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Rank updated 5 minutes ago</span>
        </div>
      </motion.div>

      {/* 2. Analytics Overview (Top Row Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          label="Total Points"
          value="1,920"
          subtext="Rank #5 overall"
          icon={Trophy}
          iconClass="text-brand-orange"
          iconBgClass="bg-brand-orange/15"
          delay={0.05}
        />
        <StatsCard
          label="Current Rank"
          value="#5"
          subtext="Top 15% percentile"
          icon={Award}
          iconClass="text-brand-blue"
          iconBgClass="bg-brand-blue/15"
          delay={0.1}
        />
        <StatsCard
          label="Day Streak"
          value="4 Days"
          subtext="Keep building!"
          icon={Flame}
          iconClass="text-red-500"
          iconBgClass="bg-red-500/15"
          delay={0.15}
        />
        <StatsCard
          label="Events Participated"
          value="8"
          subtext="3 Upcoming events"
          icon={Calendar}
          iconClass="text-purple-600"
          iconBgClass="bg-purple-600/15"
          delay={0.2}
        />
      </section>

      {/* 3. Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-full">
          <PointsProgressChart />
        </div>
        <div className="h-full">
          <ParticipationTrendChart />
        </div>
        <div className="h-full">
          <AchievementDistributionChart />
        </div>
      </section>

      {/* 4. Ranking Insights & Leaderboard Table */}
      <section className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch">
        {/* Left: Ranking Insights (30% equivalent / 3 cols) */}
        <div className="xl:col-span-3 flex flex-col h-full">
          <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3.5 pl-1">
            Status Breakdown
          </h2>
          <div className="flex-1">
            <RankingInsights />
          </div>
        </div>

        {/* Right: Leaderboard Table (70% equivalent / 7 cols) */}
        <div className="xl:col-span-7 flex flex-col">
          <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3.5 pl-1">
            Community Standings
          </h2>
          <div className="flex-1">
            <LeaderboardTable />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
