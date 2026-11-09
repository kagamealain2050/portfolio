import { tech } from "@/lib/content";

export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {tech.map((t) => <li key={t + hidden}>{t}</li>)}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}
