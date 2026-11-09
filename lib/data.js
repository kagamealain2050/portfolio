import { getSql } from "@/lib/db";
import { stories, projects, testimonials } from "@/lib/content";

async function fromDb(query, fallback) {
  const sql = getSql();
  if (!sql) return fallback;
  try {
    const rows = await query(sql);
    return rows.length ? rows : fallback;
  } catch (err) {
    console.error("[db] falling back to static content:", err.message);
    return fallback;
  }
}

export const getStories = () =>
  fromDb((sql) => sql`SELECT id, title, period, description, tags FROM stories ORDER BY position, id`, stories);

export const getProjects = () =>
  fromDb((sql) => sql`SELECT id, title, description, tags, kind, url FROM projects ORDER BY position, id`, projects);

export const getTestimonials = () =>
  fromDb((sql) => sql`SELECT id, quote, author, role FROM testimonials ORDER BY position, id`, testimonials);
