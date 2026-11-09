"use client";
import { useState } from "react";
import { usePolling } from "@/lib/usePolling";

function Thumb() {
  return (
    <div className="thumb" aria-hidden="true">
      <div className="thumb-left"><i /><i /><i className="short" /></div>
      <div className="thumb-right">
        <b>Choose A Plan</b>
        <div><span>$19</span><span>$39</span><span>$99</span></div>
      </div>
    </div>
  );
}

export default function Stories({ items: initial }) {
  const items = usePolling("/api/stories", initial);
  const [open, setOpen] = useState(items[0]?.id);
  return (
    <section id="experience" className="section narrow">
      <h2 className="h2" data-reveal>Engineering Success Stories</h2>
      <p className="live-note"><i className="dot" /> Updates in real time</p>
      <ul className="stories" data-reveal>
        {items.map((s) => {
          const isOpen = open === s.id;
          return (
            <li key={s.id} className={isOpen ? "open" : ""}>
              <button className="story-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
                <span className="story-main">
                  <span className="story-title">{s.title}</span>
                  {isOpen && s.period && <span className="story-date">{s.period}</span>}
                </span>
                <span className="tags">
                  {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </span>
              </button>
              {isOpen && (
                <div className="story-body">
                  <Thumb />
                  <p>{s.description}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
