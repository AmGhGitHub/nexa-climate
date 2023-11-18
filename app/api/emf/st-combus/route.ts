import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export async function GET(req: NextRequest) {
  const emisCalculationBase = req.nextUrl.searchParams.get(
    "emisCalculationBase"
  );

  let fuelType = null;
  if (emisCalculationBase === "hc") {
    fuelType = await prisma.st_combus_hc_based_emis.findMany({
      distinct: ["fuel_type"],
      select: {
        id: true,
        fuel_type: true,
      },
    });
  } else if (emisCalculationBase === "quantity") {
    fuelType = await prisma.st_combus_quant_based_emis.findMany({
      distinct: ["fuel_type"],
      select: {
        id: true,
        fuel_type: true,
      },
    });
  }

  // console.log(fuelType);

  return NextResponse.json({ fuelType });
}
