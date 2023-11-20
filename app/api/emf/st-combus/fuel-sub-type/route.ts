import prisma from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export async function GET(req: NextRequest) {
  const emisCalculationBase = req.nextUrl.searchParams.get(
    "emisCalculationBase"
  );
  const selectedFuelType = req.nextUrl.searchParams.get("selectedFuelType");
  try {
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
      const _units = await prisma.st_combus_hc_based_emis.findFirst({
        distinct: ["fuel_sub_type"],
        where: { fuel_type: selectedFuelType }, // fuelType is guaranteed to be a string here
        select: {
          id: true,
          per_unit: true,
        },
      });
      return NextResponse.json({
        fuelSubTypes,
        units: _units ? [_units] : [],
      });
    }

    if (emisCalculationBase === "quantity" && selectedFuelType) {
      const fuelSubTypes = await prisma.st_combus_quant_based_emis.findMany({
        distinct: ["fuel_sub_type"],
        where: { fuel_type: selectedFuelType }, // fuelType is guaranteed to be a string here
        select: {
          id: true,
          fuel_sub_type: true,
        },
      });
      const _units = await prisma.st_combus_hc_based_emis.findFirst({
        distinct: ["fuel_sub_type"],
        where: { fuel_type: selectedFuelType }, // fuelType is guaranteed to be a string here
        select: {
          id: true,
          per_unit: true,
        },
      });
      return NextResponse.json({
        fuelSubTypes,
        units: _units ? [_units] : [],
      });
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

export async function POST(req: NextRequest) {
  // const a = await req.json();
  // console.log("****a\n\n", a);
  const { reportDate, emisSource, emisCalculationBase, fuelType, fuelSubType } =
    await req.json();

  try {
    if (emisCalculationBase === "hc") {
      // console.log("hc");
      // console.log(fuelType);
      const emisFactors = await prisma.st_combus_hc_based_emis.findFirst({
        where: {
          fuel_type: fuelType,
          fuel_sub_type: fuelSubType,
        },
        select: {
          co2_emis_value: true,
          n2o_emis_value: true,
          ch4_emis_value: true,
        },
      });

      // console.log(emisFactors);

      if (emisFactors) {
        const new_emis = {
          report_date: reportDate,
          emission_source: emisSource,
          CO2_emis: emisFactors.co2_emis_value * 1,
          CH4_emis: emisFactors.ch4_emis_value * 25,
          N2O_emis: emisFactors.n2o_emis_value * 298,
        };
        const res = await prisma.scope1_emission_summary.create({
          data: new_emis,
        });
        return NextResponse.json(res, { status: 201 });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while fetching data.",
    });
  }
}
//     const newFuelSubType = await prisma.scope1_emission_summary.create({
//       data: {
//         fuel_sub_type: fuelSubType,
//         fuel_type: fuelType,
//         per_unit: perUnit,
//       },
//     });
//     return NextResponse.json(newFuelSubType);
//   }

//   if (emisCalculationBase === "quantity") {
//     const newFuelSubType = await prisma.st_combus_quant_based_emis.create({
//       data: {
//         fuel_sub_type: fuelSubType,
//         fuel_type: fuelType,
//         per_unit: perUnit,
//       },
//     });
//     return NextResponse.json(newFuelSubType);
//   }

//   // Handle cases where emisCalculationBase is not 'hc' or 'quantity'
//   return NextResponse.json({ message: "Invalid parameters" });
// } catch (error) {
//   // Error handling
//   console.error(error);
//   return NextResponse.json({
//     error: "An error occurred while creating the new fuel sub type.",
//   });
// }
