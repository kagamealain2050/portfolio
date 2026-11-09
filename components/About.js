import { Icon } from "./Icons";
import { site } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="about" data-reveal>
      <div>
        <h2 className="about-title">About Me</h2>
        <p className="about-text">{site.about.text.replace("{name}", site.name)}</p>
      </div>
      <ul className="about-cards">
        {site.about.cards.map((c) => (
          <li key={c.text} className="spot">
            <span className="icon-chip"><Icon name={c.icon} size={20} /></span>
            <p>{c.text}</p>
            <a className="round-arrow" href="#services" aria-label="Learn more"><Icon name="arrow" size={18} /></a>
          </li>
        ))}
      </ul>
    </section>
  );
}
