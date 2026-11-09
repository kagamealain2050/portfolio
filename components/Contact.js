"use client";
import { useState } from "react";
import { Icon } from "./Icons";
import LiveStatus from "./LiveStatus";
import { site } from "@/lib/content";
import { waLink, waNumber } from "@/lib/whatsapp";

export default function Contact() {
  const [state, setState] = useState({ status: "idle", msg: "" });
  const wa = waLink();

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setState({ status: "ok", msg: "Thanks! Your message has been sent." });
    } catch (err) {
      setState({ status: "error", msg: err.message });
    }
  }

  function sendViaWhatsApp(e) {
    const form = e.currentTarget.form;
    const { name, message } = Object.fromEntries(new FormData(form));
    const text = `Hello ${site.shortName}, I'm ${name || "a visitor"}. ${message || site.whatsapp.message}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="section wide contact">
      <div className="contact-left">
        <h2 className="h2 left" data-reveal>Let’s Work Together</h2>
        <p className="muted" data-reveal style={{ "--d": "60ms" }}>Have a project in mind or need an IT expert on your team? Reach me instantly on WhatsApp or send a message.</p>

        <div className="contact-actions" data-reveal style={{ "--d": "120ms" }}>
          {wa && (
            <a className="wa-card spot" href={wa} target="_blank" rel="noreferrer">
              <span className="wa-ico"><Icon name="whatsapp" size={24} /></span>
              <span>
                <b>Chat on WhatsApp</b>
                <small>+{waNumber}</small>
              </span>
              <Icon name="arrow" size={18} />
            </a>
          )}
          <a className="contact-mail" href={`mailto:${site.email}`}><Icon name="mail" size={18} /> {site.email}</a>
        </div>

        <LiveStatus />
      </div>

      <form onSubmit={onSubmit} className="form spot" data-reveal style={{ "--d": "100ms" }} noValidate>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <label>Name<input name="name" required minLength={2} maxLength={100} placeholder="Your name" autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
        <label>Message<textarea name="message" required minLength={5} maxLength={3000} rows={5} placeholder="Tell me about your project…" /></label>
        <div className="form-actions">
          <button className="btn" disabled={state.status === "loading"}>{state.status === "loading" ? "Sending…" : "Send Message"}</button>
          {wa && (
            <button type="button" className="btn btn-ghost" onClick={sendViaWhatsApp}>
              <Icon name="whatsapp" size={17} /> Send via WhatsApp
            </button>
          )}
        </div>
        {state.msg && <p role="status" className={`form-msg ${state.status}`}>{state.msg}</p>}
      </form>
    </section>
  );
}
