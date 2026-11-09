"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

/** Live clock for the owner's timezone + availability window. Returns null until mounted. */
export function useClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  try {
    const fmt = (o) => new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, ...o }).format(now);
    const hour = parseInt(fmt({ hour: "2-digit", hour12: false }), 10) % 24;
    return {
      time: fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
      open: hour >= site.hours.start && hour < site.hours.end,
      city: (site.timezone.split("/")[1] || site.timezone).replace(/_/g, " "),
    };
  } catch {
    return null;
  }
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const on = (e) => setReduced(e.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduced;
}
