import { neon } from "@neondatabase/serverless";

/**
 * Returns a Neon SQL tagged-template client, or null when DATABASE_URL
 * is not configured (the site then falls back to the static content in
 * lib/content.js so it still renders).
 */
let client;
export function getSql() {
  if (!process.env.DATABASE_URL) return null;
  if (!client) client = neon(process.env.DATABASE_URL);
  return client;
}
