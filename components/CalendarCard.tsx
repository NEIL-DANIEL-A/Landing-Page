"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Clock, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { events, CommunityEvent } from "@/data/events";

function AwsCloudWatchIcon({ className }: { className?: string }) {
  return (
    <img
      src="/aws-cloudwatch.svg"
      alt="AWS CloudWatch"
      className={className}
    />
  );
}

// Parse "Jun 20, 2026" → Date object
function parseEventDate(dateStr: string): Date {
  return new Date(dateStr);
}

// Build lookup: "YYYY-M-D" → CommunityEvent[]
function buildEventMap(evts: CommunityEvent[]): Record<string, CommunityEvent[]> {
  const map: Record<string, CommunityEvent[]> = {};
  for (const evt of evts) {
    const d = parseEventDate(evt.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map[key]) map[key] = [];
    map[key].push(evt);
  }
  return map;
}



const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarCard() {
  const router = useRouter();
  const today = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [iconHovered, setIconHovered] = useState(false);

  const eventMap = buildEventMap(events);
  const upcomingCount = events.filter(e => parseEventDate(e.date) >= today).length;

  /* ── month navigation ── */
  const prevMonth = useCallback(() => {
    setSelectedDay(null);
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m => m - 1);
    }
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    setSelectedDay(null);
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m => m + 1);
    }
  }, [viewMonth]);

  /* ── day grid ── */
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length < 42) cells.push(null);

  /* ── filtered events for current month ── */
  const monthEvents = events.filter(evt => {
    const d = parseEventDate(evt.date);
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
  });

  /* ── open/close ── */
  const openModal = () => { setSelectedDay(null); setIsOpen(true); };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* ── Stat Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        onClick={openModal}
        className="glass-panel rounded-[22px] overflow-hidden p-6 border border-white/25 cursor-pointer select-none transition-all duration-[250ms] ease-out"
        style={{ background: "rgba(255, 255, 255, 0.92)" }}
        whileHover={{
          y: -3,
          boxShadow: "-12px 0 28px rgba(105, 145, 255, 0), 12px 0 28px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(15, 23, 42, 0.10)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-sm font-medium text-foreground/60 tracking-wide uppercase">Calendar</span>
            <span className="text-3xl font-extrabold text-foreground font-display tracking-tight mt-1">
              {MONTHS[today.getMonth()].slice(0, 3)} {today.getFullYear()}
            </span>
            <span className="text-xs font-semibold text-foreground/50 mt-1">
              {upcomingCount} upcoming event{upcomingCount !== 1 ? "s" : ""}
            </span>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
          >
            <AwsCloudWatchIcon className={`w-21 h-21 transition-transform duration-200 ${iconHovered ? "scale-110" : ""}`} />
            {iconHovered && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/85 backdrop-blur-sm text-white text-[9px] font-extrabold rounded-md shadow-lg border border-white/10 whitespace-nowrap pointer-events-none tracking-wider uppercase z-30">
                CloudWatch
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="calendar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 w-full max-w-2xl rounded-[24px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.45)",
              }}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-8 pt-6 pb-5 border-b border-black/[0.06] flex-shrink-0">
                <div className="flex items-center gap-3.5">
                  <AwsCloudWatchIcon className="w-10 h-10" />
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground font-display leading-none">
                      Community Calendar
                    </h2>
                    <p className="text-xs text-foreground/50 mt-1">
                      Click a highlighted date to view its event
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2.5 rounded-xl hover:bg-black/5 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close calendar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Month / Year navigation ── */}
              <div className="flex items-center justify-between px-8 py-5 flex-shrink-0">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl hover:bg-black/5 transition-colors text-foreground/70 cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Month + Year shown together */}
                <span className="text-lg font-bold text-foreground font-display tracking-tight">
                  {MONTHS[viewMonth]} {viewYear}
                </span>

                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl hover:bg-black/5 transition-colors text-foreground/70 cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* ── Day-of-week headers ── */}
              <div className="grid grid-cols-7 px-8 pb-2 flex-shrink-0">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-bold text-foreground/40 uppercase tracking-wider py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* ── Day grid ── */}
              <div className="grid grid-cols-7 px-8 pb-4 gap-y-2 flex-shrink-0">
                {cells.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} />;

                  const key = `${viewYear}-${viewMonth}-${day}`;
                  const dayEvents = eventMap[key] ?? [];
                  const hasEvent = dayEvents.length > 0;
                  const isToday =
                    day === today.getDate() &&
                    viewMonth === today.getMonth() &&
                    viewYear === today.getFullYear();
                  const isSelected = selectedDay === day && hasEvent;

                  return (
                    <div key={key} className="relative flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (!hasEvent) return;
                          setSelectedDay(prev => (prev === day ? null : day));
                        }}
                        className={[
                          "w-12 h-12 flex items-center justify-center rounded-full text-base font-semibold transition-all duration-150 select-none",
                          hasEvent && isSelected
                            ? "bg-brand-orange text-white shadow-md shadow-brand-orange/30 ring-2 ring-brand-orange/40 scale-110"
                            : hasEvent
                              ? "bg-brand-orange/80 text-white shadow-sm shadow-brand-orange/20 hover:scale-105 cursor-pointer"
                              : isToday
                                ? "ring-2 ring-brand-teal text-brand-teal font-bold cursor-default"
                                : "text-foreground/70 hover:bg-black/5 cursor-default",
                        ].join(" ")}
                        aria-label={hasEvent ? `View events on ${MONTHS[viewMonth]} ${day}` : undefined}
                      >
                        {day}
                      </button>
                      {hasEvent && (
                        <span className="mt-1 w-2 h-2 rounded-full bg-brand-orange/60" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Events list for the current month ── */}
              <div className="overflow-y-auto flex-1 border-t border-black/[0.06] px-8 py-5 space-y-4">
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider">
                  Events this Month
                </p>
                {monthEvents.length > 0 ? (
                  monthEvents.map(evt => {
                    const d = parseEventDate(evt.date);
                    const isHighlighted = selectedDay !== null && d.getDate() === selectedDay;
                    return (
                      <button
                        key={evt.id}
                        onClick={() => {
                          closeModal();
                          router.push(`/events?register=${evt.id}`);
                        }}
                        className={`flex items-center gap-4 text-base w-full text-left rounded-2xl px-4 py-3.5 border transition-all duration-200 cursor-pointer ${isHighlighted
                            ? "bg-brand-orange/10 border-brand-orange/30 shadow-sm shadow-brand-orange/5 translate-x-1.5"
                            : "border-transparent hover:bg-black/[0.03]"
                          }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200 ${isHighlighted ? "bg-brand-orange scale-125" : "bg-brand-orange/60"}`} />
                        <div className="flex-1 min-w-0">
                          <span className={`font-semibold text-foreground truncate block transition-colors duration-200 ${isHighlighted ? "text-brand-orange" : ""}`}>
                            {evt.name}
                          </span>
                          <span className="text-xs text-foreground/50 mt-0.5 block">{evt.date} · {evt.time}</span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-xs text-foreground/40 italic py-2">
                    No events scheduled for this month.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
