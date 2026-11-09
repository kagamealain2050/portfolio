"use client";
import { useEffect, useState } from "react";

// Re-fetches `url` every `ms` while the tab is visible, so edits made in the
// database show up on the page without a reload.
export function usePolling(url, initial, ms = 20000) {
  const [data, setData] = useState(initial);
  useEffect(() => {
    let stop = false;
    async function tick() {
      if (document.hidden) return;
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok && !stop) {
          const json = await res.json();
          setData((prev) => (JSON.stringify(prev) === JSON.stringify(json) ? prev : json));
        }
      } catch {}
    }
    const t = setInterval(tick, ms);
    document.addEventListener("visibilitychange", tick);
    return () => { stop = true; clearInterval(t); document.removeEventListener("visibilitychange", tick); };
  }, [url, ms]);
  return data;
}
