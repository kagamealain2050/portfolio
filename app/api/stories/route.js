import { NextResponse } from "next/server";
import { getStories } from "@/lib/data";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await getStories(), { headers: { "Cache-Control": "no-store" } });
}
