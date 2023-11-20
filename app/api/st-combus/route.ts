import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { convertUnit } from "@/lib/unitConverter";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const query = url.searchParams;

  // Get a specific query parameter, e.g., 'id'
  const search = query.get("search");

  let results = null;
  if (search === "fuel-type") {
    results = await prisma.st_combus.findMany({
      distinct: ["fuel_type"],
      select: { id: true, fuel_type: true },
    });
  }

  const fuel_type = query.get("fuel-type");
  if (search === "fuel-sub-type" && fuel_type) {
    results = await prisma.st_combus.findMany({
      distinct: ["fuel_sub_type"],
      where: { fuel_type },
      select: { id: true, fuel_sub_type: true },
    });
  }

  const fuel_sub_type = query.get("fuel-sub-type");

  if (search === "unit-type" && fuel_type && fuel_sub_type) {
    // console.log("here");
    results = await prisma.st_combus.findFirst({
      where: { fuel_type, fuel_sub_type },
      select: { unit_type: true },
    });

    const unit_tyes = await prisma.units.findMany({
      where: { unit_type: results?.unit_type },
      select: { id: true, legit_unit: true },
    });

    results = unit_tyes;
  }

  return NextResponse.json({ res: results }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { amount, reportDate, emisSource, fuelType, fuelSubType, unit } =
    await req.json();

  try {
    const unit_specs = await prisma.st_combus.findFirst({
      where: {
        fuel_type: fuelType,
        fuel_sub_type: fuelSubType,
      },
      select: {
        base_unit: true,
        unit_type: true,
        CO2_emis_kgCO2_per_mmbtu: true,
        CH4_emis_grCH4_per_mmbtu: true,
        N2O_emis_grN2O_per_mmbtu: true,
      },
    });
    const unitType = unit_specs?.unit_type;
    const base_unit = unit_specs?.base_unit;
    const converted_amount = convertUnit(amount, unit, base_unit, unitType);
    console.log(amount, unit, base_unit, unitType);
    console.log("converted_amount", converted_amount);

    return NextResponse.json(unit_specs, { status: 201 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({
      error: "An error occurred while fetching data.",
    });
  }
}
