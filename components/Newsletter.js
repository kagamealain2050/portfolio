"use client";
import { useState } from "react";

export default function Newsletter() {
  const [state, setState] = useState({ status: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setState({ status: "ok", msg: "You’re subscribed. Thank you!" });
    } catch (err) {
      setState({ status: "error", msg: err.message });
    }
  }

  return (
    <section className="section narrow" aria-label="Newsletter">
      <div className="newsletter spot" data-reveal>
        <small>Subscribe to my Newsletter</small>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" required placeholder="Enter your email address" aria-label="Email address" />
          <button className="btn btn-sm" disabled={state.status === "loading"}>{state.status === "loading" ? "…" : "Subscribe"}</button>
        </form>
        {state.msg && <p role="status" className={`form-msg ${state.status}`}>{state.msg}</p>}
      </div>
    </section>
  );
}
