import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { convertUnit } from "@/lib/unit-converter";
import { roundNumber } from "@/lib/utils";
import { IAllLegitUnits, IQuantity } from "@/lib/unit-converter";
import { z } from "zod";
import { scope1_emission_summary } from "@prisma/client";

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
  interface IResults {
    hc_value_mmbtu_per_base_unit: number;
    base_unit: string;
    unit_type: string;
    CO2_emis_kgCO2_per_mmbtu: number;
    CH4_emis_grCH4_per_mmbtu: number;
    N2O_emis_grN2O_per_mmbtu: number;
  }

  const { amount, reportDate, emisSource, fuelType, fuelSubType, unit } =
    await req.json();

  try {
    const gwp = await prisma.gwp.findMany({});
    console.log(gwp);

    const results: IResults | null = await prisma.st_combus.findFirst({
      where: {
        fuel_type: fuelType,
        fuel_sub_type: fuelSubType,
      },
      select: {
        base_unit: true,
        unit_type: true,
        hc_value_mmbtu_per_base_unit: true,
        CO2_emis_kgCO2_per_mmbtu: true,
        CH4_emis_grCH4_per_mmbtu: true,
        N2O_emis_grN2O_per_mmbtu: true,
      },
    });
    if (results === null) {
      // Handle the case where no results are found
      return NextResponse.json(
        {
          error: "No data found for the specified criteria.",
        },
        { status: 404 }
      );
    }

    const {
      base_unit,
      unit_type,
      hc_value_mmbtu_per_base_unit,
      CO2_emis_kgCO2_per_mmbtu,
      CH4_emis_grCH4_per_mmbtu,
      N2O_emis_grN2O_per_mmbtu,
    } = results;

    const value_mmbtu =
      convertUnit(
        amount,
        unit as IAllLegitUnits,
        base_unit as IAllLegitUnits,
        unit_type as IQuantity
      ) * hc_value_mmbtu_per_base_unit;

    const new_emis = {
      report_date: reportDate,
      emission_source: emisSource,
      CO2_emis: roundNumber(
        (value_mmbtu * CO2_emis_kgCO2_per_mmbtu) / 1000.0,
        2
      ),
      CH4_emis: roundNumber(
        (value_mmbtu * CH4_emis_grCH4_per_mmbtu * 25) / 1.0e6,
        2
      ),
      N2O_emis: roundNumber(
        (value_mmbtu * N2O_emis_grN2O_per_mmbtu * 298) / 1.0e6,
        2
      ),
    };
    const res = await prisma.scope1_emission_summary.create({
      data: new_emis,
    });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({
      error: "An error occurred while fetching data.",
    });
  }
}
