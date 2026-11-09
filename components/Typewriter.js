"use client";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function Typewriter({ words }) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(words[0]);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("hold"); // type | hold | delete

  useEffect(() => {
    if (reduced) { setText(words[0]); return; }
    const w = words[i % words.length];
    let t;
    if (phase === "type") {
      if (text.length < w.length) t = setTimeout(() => setText(w.slice(0, text.length + 1)), 70);
      else t = setTimeout(() => setPhase("hold"), 0);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), 1700);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 38);
      else { setI((n) => n + 1); setPhase("type"); }
    }
    return () => clearTimeout(t);
  }, [text, phase, i, reduced, words]);

  return (
    <span className="typed-wrap">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="typed">{text}</span>
      <span aria-hidden="true" className="caret" />
    </span>
  );
}
