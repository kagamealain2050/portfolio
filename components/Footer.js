import { Icon, Logo } from "./Icons";
import { site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const wa = waLink();
  return (
    <footer className="footer">
      <a href="#top" className="nav-logo" aria-label="Back to top"><Logo /></a>
      <nav aria-label="Footer">
        {site.nav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="#contact">Contact Me</a>
      </nav>
      <div className="foot-social">
        {wa && <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={18} /></a>}
        <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
        <a href={site.socials.behance} target="_blank" rel="noreferrer" aria-label="Behance"><span className="be sm">Bē</span></a>
      </div>
      <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
