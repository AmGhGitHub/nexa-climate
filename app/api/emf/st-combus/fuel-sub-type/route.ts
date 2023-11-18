import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const emisCalculationBase = req.nextUrl.searchParams.get(
      "emisCalculationBase"
    );
    const selectedFuelType = req.nextUrl.searchParams.get("selectedFuelType");

    // Check if fuelType is not null before proceeding
    if (emisCalculationBase === "hc" && selectedFuelType) {
      const fuelSubTypes = await prisma.st_combus_hc_based_emis.findMany({
        distinct: ["fuel_sub_type"],
        where: { fuel_type: selectedFuelType }, // fuelType is guaranteed to be a string here
        select: {
          id: true,
          fuel_sub_type: true,
        },
      });
      return NextResponse.json({ fuelSubTypes });
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
