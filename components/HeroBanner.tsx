"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Cloud, Sparkles, ShieldCheck, Cpu, Award } from "lucide-react";
import Link from "next/link";

interface HeroBannerProps {
  onViewLeaderboardClick?: () => void;
}

export default function HeroBanner({ onViewLeaderboardClick }: HeroBannerProps = {}) {
  const [greeting, setGreeting] = useState("Hello");
  const [icon, setIcon] = useState();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="gradient-container">
      <div className="gradient-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full min-h-[300px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Hero Text Content */}
          <div className="relative z-10 flex-1 flex flex-col items-start text-black">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-semibold mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-spin" style={{ animationDuration: "4s" }} />
              <span>AWS Community Builders Portal</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-black drop-shadow-sm mb-3">
              {greeting}, Neil Daniel! {icon}
            </h1>

            <p className="text-black/80 max-w-xl text-[14px] md:text-base leading-relaxed mb-6">
              You're on track. Complete upcoming activities, attend community events, and continue climbing the leaderboard to unlock premium rewards and certifications.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-black font-semibold text-sm shadow-lg shadow-brand-orange/20 flex items-center gap-2 group transition-all"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              {onViewLeaderboardClick ? (
                <motion.button
                  onClick={onViewLeaderboardClick}
                  whileHover={{ scale: 1.03, y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-black/5 border border-black/10 text-black font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-brand-orange" />
                  <span>View Leaderboard</span>
                </motion.button>
              ) : (
                <Link href="/leaderboard">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-black/5 border border-black/10 text-black font-semibold text-sm flex items-center gap-2 transition-all"
                  >
                    <Trophy className="w-4 h-4 text-brand-orange" />
                    <span>View Leaderboard</span>
                  </motion.button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Visual Panel */}
          <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex justify-center items-center md:px-4">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Animated floating circles / orbits */}
              <div className="absolute w-44 h-44 border border-dashed border-black/10 rounded-full animate-spin" style={{ animationDuration: "25s" }} />
              <div className="absolute w-32 h-32 border border-dotted border-black/20 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
              
              {/* Floating Cloud Illustration (Lucide SVG customized) */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-10 w-24 h-24 bg-gradient-to-br from-brand-orange to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-orange/30 border border-black/10"
              >
                <Cloud className="w-12 h-12 text-black animate-pulse" />
              </motion.div>

              {/* Badge 1: Certifications */}
              <motion.div
                animate={{ y: [-5, 8, -5], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-4 w-11 h-11 bg-black/5 rounded-xl flex items-center justify-center border border-black/10 shadow-md"
              >
                <Award className="w-5 h-5 text-brand-orange" />
              </motion.div>

              {/* Badge 2: Tech Shield */}
              <motion.div
                animate={{ y: [8, -5, 8], x: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 right-4 w-11 h-11 bg-black/5 rounded-xl flex items-center justify-center border border-black/10 shadow-md"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </motion.div>

              {/* Badge 3: CPU Tech */}
              <motion.div
                animate={{ y: [-10, 5, -10], x: [5, -5, 5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-0 w-11 h-11 bg-black/5 rounded-xl flex items-center justify-center border border-black/10 shadow-md"
              >
                <Cpu className="w-5 h-5 text-brand-blue" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
