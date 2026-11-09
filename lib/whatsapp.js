import { site } from "@/lib/content";

export const waNumber = (site.whatsapp.number || "").replace(/\D/g, "");

/** Returns a wa.me link, or null when no number is configured. */
export function waLink(text = site.whatsapp.message) {
  if (!waNumber) return null;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}
