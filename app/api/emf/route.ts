import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const fuelsResult = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_type"],
    select: {
      fuel_type: true,
    },
  });
  const fuelSubTypesResult = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_sub_type"],
    select: {
      fuel_sub_type: true,
    },
  });

  // Extract only the strings
  const fuels = fuelsResult.map((fuel) => fuel.fuel_type);
  const fuel_sub_types = fuelSubTypesResult.map(
    (fuelSubType) => fuelSubType.fuel_sub_type
  );

  return NextResponse.json({ fuels, fuel_sub_types });
}