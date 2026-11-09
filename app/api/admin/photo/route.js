import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { sniffImage } from "@/lib/image";

const MAX_BYTES = 3 * 1024 * 1024;
const sha = (v) => createHash("sha256").update(String(v)).digest();

function authorized(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { ok: false, res: NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 503 }) };
  if (!password || !timingSafeEqual(sha(password), sha(expected))) {
    return { ok: false, res: NextResponse.json({ error: "Wrong password." }, { status: 401 }) };
  }
  return { ok: true };
}

async function ensureTable(sql) {
  await sql`CREATE TABLE IF NOT EXISTS site_assets (key TEXT PRIMARY KEY, content_type TEXT NOT NULL, data TEXT NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
}

export async function POST(request) {
  let form;
  try { form = await request.formData(); } catch { return NextResponse.json({ error: "Invalid upload." }, { status: 400 }); }
  const auth = authorized(form.get("password"));
  if (!auth.ok) return auth.res;

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const file = form.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "Choose an image first." }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) return NextResponse.json({ error: "Image is too large (max 3 MB)." }, { status: 413 });
  const type = sniffImage(buf);
  if (!type) return NextResponse.json({ error: "Use a PNG, JPG or WebP image." }, { status: 415 });

  try {
    await ensureTable(sql);
    await sql`INSERT INTO site_assets (key, content_type, data, updated_at) VALUES ('profile', ${type}, ${buf.toString("base64")}, now())
              ON CONFLICT (key) DO UPDATE SET content_type = EXCLUDED.content_type, data = EXCLUDED.data, updated_at = now()`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/photo]", err.message);
    return NextResponse.json({ error: "Could not save the photo." }, { status: 500 });
  }
}

export async function DELETE(request) {
  const auth = authorized(request.headers.get("x-admin-password"));
  if (!auth.ok) return auth.res;
  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  try {
    await ensureTable(sql);
    await sql`DELETE FROM site_assets WHERE key = 'profile'`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/photo]", err.message);
    return NextResponse.json({ error: "Could not reset the photo." }, { status: 500 });
  }
}
