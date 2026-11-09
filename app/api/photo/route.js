import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

// Serves the uploaded profile photo from Neon; falls back to the static file set in lib/content.js (site.photo)
export async function GET(request) {
  const sql = getSql();
  if (sql) {
    try {
      const rows = await sql`SELECT content_type, data FROM site_assets WHERE key = 'profile'`;
      if (rows.length) {
        return new NextResponse(Buffer.from(rows[0].data, "base64"), {
          headers: {
            "Content-Type": rows[0].content_type,
            "Cache-Control": "public, max-age=30, stale-while-revalidate=300",
            "X-Content-Type-Options": "nosniff",
          },
        });
      }
    } catch (err) {
      console.error("[photo]", err.message);
    }
  }
  return NextResponse.redirect(new URL(site.photo.src, request.url), { status: 307, headers: { "Cache-Control": "public, max-age=30" } });
}
