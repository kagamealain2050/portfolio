import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";


async function snapshot(sql) {
  const [row] = await sql`
    SELECT
      (SELECT count(*)::int FROM presence WHERE last_seen > now() - interval '45 seconds') AS online,
      (SELECT COALESCE(max(value), 0)::int FROM stats WHERE key = 'views') AS views`;
  return { live: true, online: Math.max(row.online, 1), views: row.views };
}

export async function GET() {
  const sql = getSql();
  if (!sql) return NextResponse.json({ live: false });
  try {
    return NextResponse.json(await snapshot(sql), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[live:get]", err.message);
    return NextResponse.json({ live: false });
  }
}

/** Heartbeat: { id: string, first?: boolean }. `first` counts one page view per browser session. */
export async function POST(request) {
  const sql = getSql();
  if (!sql) return NextResponse.json({ live: false });

  let body = {};
  try { body = await request.json(); } catch {}
  const id = String(body.id ?? "");
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  try {
    await sql`INSERT INTO presence (visitor_id, last_seen) VALUES (${id}, now())
              ON CONFLICT (visitor_id) DO UPDATE SET last_seen = now()`;
    if (body.first) {
      await sql`INSERT INTO stats (key, value) VALUES ('views', 1)
                ON CONFLICT (key) DO UPDATE SET value = stats.value + 1`;
    }
    if (Math.random() < 0.03) await sql`DELETE FROM presence WHERE last_seen < now() - interval '1 day'`;
    return NextResponse.json(await snapshot(sql), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[live:post]", err.message);
    return NextResponse.json({ live: false });
  }
}
