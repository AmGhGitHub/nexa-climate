import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fuelType = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_type"],
    select: {
      id: true,
      fuel_type: true,
    },
  });
  return NextResponse.json({ fuelType });
}
