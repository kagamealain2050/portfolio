import Counter from "./Counter";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section className="section wide" aria-label="Key numbers">
      <ul className="stats-grid">
        {stats.map((s, i) => (
          <li key={s.label} className="spot" data-reveal style={{ "--d": `${i * 90}ms` }}>
            <strong><Counter value={s.value} suffix={s.suffix} /></strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
