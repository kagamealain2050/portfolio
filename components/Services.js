import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section wide services">
      <div className="services-intro" data-reveal>
        <h2 className="h2 left">Our Service</h2>
        <p>Providing innovative IT solutions to streamline your operations, enhance security, and power your business growth.</p>
      </div>
      <ul className="service-list">
        {services.map((s, i) => (
          <li key={s.title} className="spot" data-reveal style={{ "--d": `${i * 100}ms` }}>
            <h3>{s.title}</h3>
            <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
