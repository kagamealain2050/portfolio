"use client";
import { useEffect, useRef, useState } from "react";
import { Logo, Icon } from "./Icons";
import { site } from "@/lib/content";

const SECTION_IDS = ["about", "experience", "skills", "projects", "services", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      bar.current?.style.setProperty("--p", max > 0 ? String(Math.min(1, y / max)) : "0");
      let cur = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const links = [...site.nav, { label: "Contact Me", href: "#contact" }];
  const isActive = (href) => href === `#${active}` ;

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#top" className="nav-logo" aria-label={`${site.name} — home`}>
            <Logo />
          </a>
          <nav className="nav-pill" aria-label="Primary">
            {site.nav.map((l) => (
              <a key={l.href} href={l.href} aria-current={isActive(l.href) ? "true" : undefined}>{l.label}</a>
            ))}
          </nav>
          <div className="nav-right">
            <a href="#contact" className="btn nav-cta">Contact Me</a>
            <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
            {links.map((l) => (
              <a key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
