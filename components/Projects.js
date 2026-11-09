"use client";
import { usePolling } from "@/lib/usePolling";

function Phone() {
  return (
    <div className="vis vis-phone" aria-hidden="true">
      <div className="phone">
        <div className="phone-top"><small>Search Flights</small></div>
        <div className="phone-card"><i /><i className="short" /></div>
        <div className="phone-card"><i /><i className="short" /></div>
        <div className="phone-btn" />
      </div>
      <div className="phone ghost" />
    </div>
  );
}

function Laptop() {
  return (
    <div className="vis vis-laptop" aria-hidden="true">
      <div className="laptop">
        <div className="laptop-screen">
          <b>Simplify Your Workflow,<br />Automate Success</b>
          <div className="stats"><span>10+</span><span>60+</span><span>30%</span></div>
        </div>
        <div className="laptop-base" />
      </div>
    </div>
  );
}

export default function Projects({ items: initial }) {
  const items = usePolling("/api/projects", initial);
  return (
    <section id="projects" className="section wide">
      <h2 className="h2" data-reveal>My Recent Project</h2>
      <p className="live-note"><i className="dot" /> Updates in real time</p>
      <div className="projects">
        {items.map((p, i) => (
          <a key={p.id} className="project spot" data-reveal style={{ "--d": `${i * 100}ms` }} href={p.url || "#"} target={p.url && p.url !== "#" ? "_blank" : undefined} rel="noreferrer">
            {p.kind === "phone" ? <Phone /> : <Laptop />}
            <div className="project-meta">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="tags">{(p.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}</span>
            </div>
          </a>
        ))}
      </div>
      <a href="#contact" className="btn wide-btn">View More</a>
    </section>
  );
}
