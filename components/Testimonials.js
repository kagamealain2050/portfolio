"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { usePolling } from "@/lib/usePolling";

export default function Testimonials({ items: initial }) {
  const items = usePolling("/api/testimonials", initial, 30000);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length, paused]);

  const t = items[i % items.length];
  return (
    <section id="testimonials" className="section narrow">
      <h2 className="h2" data-reveal>What Clients Are Saying</h2>
      <div className="quote spot" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <figure key={t.id} className="quote-fig">
          <blockquote>“{t.quote.replaceAll("{name}", site.name)}”</blockquote>
          <figcaption><b>{t.author}</b>{t.role && <span> — {t.role}</span>}</figcaption>
        </figure>
        {items.length > 1 && (
          <div className="dots" role="tablist" aria-label="Choose testimonial">
            {items.map((x, n) => (
              <button key={x.id} role="tab" aria-selected={n === i % items.length} aria-label={`Testimonial ${n + 1}`} className={n === i % items.length ? "on" : ""} onClick={() => setI(n)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
