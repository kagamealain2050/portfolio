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
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!emailRe.test(email) || email.length > 200) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  try {
    await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter]", err.message);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
