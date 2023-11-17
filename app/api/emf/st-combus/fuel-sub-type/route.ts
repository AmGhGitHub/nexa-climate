import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const emisCalculationBase = req.nextUrl.searchParams.get(
      "emisCalculationBase"
    );
    const fuelType = req.nextUrl.searchParams.get("fuelType");

    // Check if fuelType is not null before proceeding
    if (emisCalculationBase === "hc" && fuelType) {
      const fuelSubType = await prisma.st_combus_hc_based_emis.findMany({
        distinct: ["fuel_sub_type"],
        where: { fuel_type: fuelType }, // fuelType is guaranteed to be a string here
        select: {
          id: true,
          fuel_sub_type: true,
        },
      });
      return NextResponse.json({ fuelSubType });
    }

    // Handle cases where emisCalculationBase is not 'hc' or fuelType is null
    return NextResponse.json({ message: "Invalid parameters" });
  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while fetching data.",
    });
  }
}
