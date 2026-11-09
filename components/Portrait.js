"use client";
import { useRef, useState } from "react";
import Counter from "./Counter";
import { useClock } from "@/lib/hooks";
import { site } from "@/lib/content";

/**
 * Framed portrait with subtle pointer-tilt, availability chip and experience chip.
 * The image is served by /api/photo: the photo uploaded at /admin (stored in Neon),
 * otherwise public/profile.jpg.
 */
export default function Portrait() {
  const ref = useRef(null);
  const clock = useClock();
  const [broken, setBroken] = useState(false);
  const initials = site.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div className="portrait" onPointerMove={onMove} onPointerLeave={reset}>
      <div className="portrait-tilt" ref={ref}>
        <div className="portrait-frame">
          {broken ? (
            <div className="portrait-fallback" role="img" aria-label="Profile photo placeholder">{initials}</div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/api/photo"
              alt={site.photo.alt}
              width="800"
              height="1000"
              fetchPriority="high"
              decoding="async"
              style={{ objectPosition: site.photo.position }}
              onError={() => setBroken(true)}
            />
          )}
          <div className="portrait-fade" />
        </div>
        <div className="chip chip-a">
          <span className={`dot ${clock?.open ? "on" : ""}`} aria-hidden="true" />
          {clock ? (clock.open ? "Available now" : "Back soon") : "Available"}
        </div>
        <div className="chip chip-b">
          <b><Counter value={8} suffix="+" /></b> years experience
        </div>
      </div>
    </div>
  );
}
