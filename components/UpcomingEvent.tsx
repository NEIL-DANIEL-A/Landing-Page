"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import GlassCard from "./GlassCard";
import { events } from "@/data/events";

export default function UpcomingEvent() {
  // Pick the next upcoming event (earliest date >= today)
  const today = new Date();
  const upcoming = events
    .map(e => ({ ...e, _date: new Date(e.date) }))
    .filter(e => e._date >= today)
    .sort((a, b) => a._date.getTime() - b._date.getTime());

  const event = upcoming.length > 0 ? upcoming[0] : null;

  if (!event) {
    return (
      <GlassCard className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-display">No Upcoming Events</h3>
        <p className="text-sm text-foreground/50 mt-1.5 max-w-xs">
          Check back later for new workshops, meetups, and conferences.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col lg:flex-row h-full border border-white/30 featured-event-bg" hoverEffect={false}>
      {/* Poster */}
      <div className="relative w-full lg:w-[42%] aspect-[4/5] overflow-hidden bg-slate-50">
        <img
          src={event.bannerUrl}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider">
            Upcoming
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl font-extrabold text-foreground font-display tracking-tight mb-1.5">
            {event.name}
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Details List */}
          <div className="space-y-3 mb-4 text-base text-foreground/85">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-foreground/50 font-bold uppercase tracking-wider leading-none">Date</span>
                <span className="font-semibold text-foreground/90 mt-0.5">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-brand-blue" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-foreground/50 font-bold uppercase tracking-wider leading-none">Time</span>
                <span className="font-semibold text-foreground/90 mt-0.5">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-brand-teal" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-foreground/50 font-bold uppercase tracking-wider leading-none">Venue</span>
                <span className="font-semibold text-foreground/90 mt-0.5 truncate">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Register CTA */}
        <div>
          <Link
            href={`/events?register=${event.id}`}
            className="w-full py-3.5 rounded-xl font-semibold text-base shadow-md transition-all duration-300 flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/95 text-white hover:shadow-brand-orange/15 hover:-translate-y-0.5"
          >
            <span>Register Now</span>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
