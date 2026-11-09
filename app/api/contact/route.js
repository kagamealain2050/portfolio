import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (body.website) return NextResponse.json({ ok: true }); // honeypot
  if (name.length < 2 || name.length > 100) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!emailRe.test(email) || email.length > 200) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 5 || message.length > 3000) return NextResponse.json({ error: "Message must be 5–3000 characters." }, { status: 400 });

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  try {
    await sql`INSERT INTO messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err.message);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }
}
