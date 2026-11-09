// Usage: npm run db:setup   (reads DATABASE_URL from .env.local)
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { stories, projects, testimonials, site } from "../lib/content.js";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to .env.local first.");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
for (const stmt of schema.split(";").map((s) => s.trim()).filter(Boolean)) {
  await sql.query(stmt);
}
console.log("✔ Tables ready");

const [{ count }] = await sql`SELECT count(*)::int AS count FROM stories`;
if (count === 0) {
  for (const [i, s] of stories.entries())
    await sql`INSERT INTO stories (title, period, description, tags, position) VALUES (${s.title}, ${s.period}, ${s.description}, ${s.tags}, ${i})`;
  for (const [i, p] of projects.entries())
    await sql`INSERT INTO projects (title, description, tags, kind, url, position) VALUES (${p.title}, ${p.description}, ${p.tags}, ${p.kind}, ${p.url}, ${i})`;
  for (const [i, t] of testimonials.entries())
    await sql`INSERT INTO testimonials (quote, author, role, position) VALUES (${t.quote.replaceAll("{name}", site.name)}, ${t.author}, ${t.role}, ${i})`;
  console.log("✔ Seeded starter content");
} else {
  console.log("• Content already present, skipping seed");
}
