"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle, Award, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { events } from "@/data/events";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function EventsContent() {
  const [registeredEvents, setRegisteredEvents] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const registerId = searchParams.get("register");

  useEffect(() => {
    if (registerId) {
      setRegisteredEvents((prev) => ({
        ...prev,
        [registerId]: true,
      }));
    }
  }, [registerId]);

  const toggleRegister = (id: string) => {
    setRegisteredEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => {
        const isRegistered = !!registeredEvents[event.id];

        return (
          <GlassCard
            key={event.id}
            className="p-0 overflow-hidden flex flex-col h-full border border-white/20 hover:border-white/40"
            hoverEffect={true}
            delay={index * 0.08}
          >
            {/* Event Banner */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={event.bannerUrl}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-black/40 text-white text-[10px] font-semibold backdrop-blur-sm uppercase tracking-wide">
                  {event.tag}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-lg bg-brand-orange text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{event.points} pts</span>
                </span>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-[17px] font-extrabold text-foreground font-display tracking-tight mb-2 leading-tight">
                {event.name}
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed mb-5 flex-grow">
                {event.description}
              </p>

              {/* Details List */}
              <div className="space-y-2.5 mb-5 text-[13px] text-foreground/80 border-t border-black/5 pt-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="font-medium">{event.date}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span className="font-medium">{event.time}</span>
                </div>

                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span className="font-medium truncate">{event.venue}</span>
                </div>
              </div>

              {/* Register button */}
              <button
                onClick={() => toggleRegister(event.id)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  isRegistered
                    ? "bg-emerald-500 text-white shadow-emerald-500/10 cursor-default"
                    : "bg-brand-orange hover:bg-brand-orange/95 text-white hover:-translate-y-0.5"
                }`}
              >
                {isRegistered ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Registered</span>
                  </>
                ) : (
                  <span>Register Now</span>
                )}
              </button>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}

export default function EventsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 w-full"
    >
      {/* Page Header */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-black/5"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-foreground font-display tracking-tight flex items-center gap-2">
            <span>Community Events</span>
            <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            Browse upcoming workshops, bootcamp learning sessions, and community conferences.
          </p>
        </div>
      </motion.div>

      {/* Events Grid with Suspense */}
      <Suspense fallback={
        <div className="w-full text-center py-20 text-foreground/50">
          Loading events feed...
        </div>
      }>
        <EventsContent />
      </Suspense>
    </motion.div>
  );
}
