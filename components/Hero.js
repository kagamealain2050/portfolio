import Portrait from "./Portrait";
import Typewriter from "./Typewriter";
import { Icon } from "./Icons";
import { site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

function RoleLine() {
  return (
    <svg width="110" height="20" viewBox="0 0 110 20" aria-hidden="true" className="role-line">
      <circle cx="3" cy="16" r="2.4" fill="#fff" />
      <path d="M3 16H64L92 4" stroke="#fff" strokeWidth="1" fill="none" opacity=".7" />
      <circle cx="92" cy="4" r="2.4" fill="#fff" />
    </svg>
  );
}

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const wa = waLink();
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <h1 className="hello" data-reveal>Hello,</h1>
        <p className="tagline" data-reveal style={{ "--d": "80ms" }}>{site.tagline}</p>
        <p className="typed-line" data-reveal style={{ "--d": "140ms" }}>
          I’m an <Typewriter words={site.roles} />
        </p>
        <div className="cta-row" data-reveal style={{ "--d": "200ms" }}>
          {wa && (
            <a className="btn" href={wa} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={17} /> WhatsApp me
            </a>
          )}
          <a className="btn btn-ghost" href="#projects">View my work</a>
        </div>
      </div>

      <svg className="connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M27 22 H72 M75 27 L78 37 H79 M85 37 H88 M94 37 H96 L100 42" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="social-layer">
        <a className="sx" style={{ "--x": "74%", "--y": "22%" }} href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={20} /></a>
        <a className="sx" style={{ "--x": "81.5%", "--y": "37%" }} href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={20} /></a>
        <a className="sx" style={{ "--x": "91%", "--y": "37%" }} href={site.socials.behance} target="_blank" rel="noreferrer" aria-label="Behance"><span className="be">Bē</span></a>
      </div>

      <Portrait />

      <ul className="roles">
        {site.roles.map((r) => (
          <li key={r}><span>{r}</span><RoleLine /></li>
        ))}
      </ul>

      <h2 className="iam" data-reveal style={{ "--d": "160ms" }}>
        <small>I am</small>
        <span>{first}</span>
        {rest.length > 0 && <span>{rest.join(" ")}</span>}
      </h2>
    </section>
  );
}
