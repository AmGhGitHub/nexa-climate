import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const fuelType = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_type"],
    select: {
      id: true,
      fuel_type: true,
    },
  });

  const fuelSubType = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_sub_type"],
    select: {
      id: true,
      fuel_sub_type: true,
    },
  });
  // const fuelSubTypesResult = await prisma.st_combus_hc_based_emis.findMany({
  //   distinct: ["fuel_sub_type"],
  //   select: {
  //     fuel_sub_type: true,
  //   },
  // });

  // Extract only the strings
  // const fuels = fuelsResult.map((fuel) => fuel.fuel_type);
  // const fuel_sub_types = fuelSubTypesResult.map(
  //   (fuelSubType) => fuelSubType.fuel_sub_type
  // );

  return NextResponse.json({ fuelType, fuelSubType });
}
