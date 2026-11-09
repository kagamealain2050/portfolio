import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/data";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await getTestimonials(), { headers: { "Cache-Control": "no-store" } });
}
