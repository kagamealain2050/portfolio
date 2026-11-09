"use client";
import { useEffect, useState } from "react";
import { useClock } from "@/lib/hooks";
import { Icon } from "./Icons";

function visitorId() {
  try {
    let id = localStorage.getItem("vid");
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`).slice(0, 36);
      localStorage.setItem("vid", id);
    }
    return id;
  } catch {
    return `anon-${Math.random().toString(16).slice(2, 14)}`;
  }
}

/** Polls /api/live every 12s with a heartbeat while the tab is visible. */
export function useLiveStats() {
  const [data, setData] = useState({ live: false });
  useEffect(() => {
    const id = visitorId();
    let first = true;
    try { first = !sessionStorage.getItem("counted"); } catch {}
    let stopped = false;

    const beat = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch("/api/live", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, first }),
        });
        if (first) { first = false; try { sessionStorage.setItem("counted", "1"); } catch {} }
        const json = await res.json();
        if (!stopped) setData(json);
      } catch {}
    };
    beat();
    const t = setInterval(beat, 12000);
    document.addEventListener("visibilitychange", beat);
    return () => { stopped = true; clearInterval(t); document.removeEventListener("visibilitychange", beat); };
  }, []);
  return data;
}

export default function LiveStatus() {
  const clock = useClock();
  const stats = useLiveStats();
  const fmt = (n) => new Intl.NumberFormat("en").format(n);

  return (
    <div className="live spot" data-reveal>
      <div className="live-head">
        <span className={`dot ${clock?.open ? "on" : ""}`} aria-hidden="true" />
        <b>{clock ? (clock.open ? "Available now" : "Away right now") : "Status"}</b>
        <span className="live-tag">LIVE</span>
      </div>
      <div className="live-grid">
        <div>
          <small>My local time{clock ? ` · ${clock.city}` : ""}</small>
          <strong className="mono" suppressHydrationWarning>{clock ? clock.time : "--:--:--"}</strong>
        </div>
        {stats.live && (
          <>
            <div>
              <small><Icon name="users" size={12} /> Online now</small>
              <strong className="mono">{fmt(stats.online)}</strong>
            </div>
            <div>
              <small><Icon name="eye" size={12} /> Total visits</small>
              <strong className="mono">{fmt(stats.views)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
