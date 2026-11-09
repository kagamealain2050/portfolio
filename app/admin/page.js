"use client";
import { useRef, useState } from "react";

// Downscale in the browser so uploads stay small and fast (max 1200px tall, WebP keeps transparency)
async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / bmp.height, 1200 / bmp.width);
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise((r) => c.toBlob(r, "image/webp", 0.9));
  return blob || file;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const fileObj = useRef(null);

  function pick(e) {
    const f = e.target.files?.[0];
    fileObj.current = f || null;
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function upload(e) {
    e.preventDefault();
    if (!fileObj.current) return setMsg({ type: "error", text: "Choose an image first." });
    setBusy(true); setMsg({ type: "", text: "" });
    try {
      const small = await shrink(fileObj.current);
      const fd = new FormData();
      fd.append("password", password);
      fd.append("file", small, "profile.webp");
      const res = await fetch("/api/admin/photo", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      setMsg({ type: "ok", text: "Photo updated. The homepage shows it within about a minute." });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally { setBusy(false); }
  }

  async function reset() {
    setBusy(true); setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/photo", { method: "DELETE", headers: { "x-admin-password": password } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Reset failed.");
      setMsg({ type: "ok", text: "Reset to the default photo." });
    } catch (err) { setMsg({ type: "error", text: err.message }); }
    finally { setBusy(false); }
  }

  return (
    <main className="admin">
      <form className="form admin-card" onSubmit={upload}>
        <h1>Profile photo</h1>
        <p className="muted">Upload any PNG, JPG or WebP. Portrait photos work best (face near the top). Any size works; it is cropped to a 4:5 frame.</p>
        <label>Admin password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
        <label>Photo<input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={pick} /></label>
        <div className="admin-preview">
          <div className="portrait-frame static">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview || "/api/photo"} alt="Preview" />
          </div>
        </div>
        <div className="admin-actions">
          <button className="btn" disabled={busy}>{busy ? "Working…" : "Upload photo"}</button>
          <button type="button" className="btn btn-ghost" onClick={reset} disabled={busy || !password}>Reset to default</button>
          <a className="btn btn-ghost" href="/">Back to site</a>
        </div>
        {msg.text && <p role="status" className={`form-msg ${msg.type}`}>{msg.text}</p>}
      </form>
    </main>
  );
}
