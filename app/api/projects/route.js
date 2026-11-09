import { NextResponse } from "next/server";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await getProjects(), { headers: { "Cache-Control": "no-store" } });
}
