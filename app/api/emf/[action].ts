import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  switch (action) {
    case "getFuelTypes":
      return handleGetFuelTypes(req, res);
    case "getFuelSubTypes":
      return handleGetFuelSubTypes(req, res);
    // Add more cases for other actions
    default:
      return res.status(404).json({ error: "Action not found" });
  }
}

async function handleGetFuelTypes(req: NextApiRequest, res: NextApiResponse) {
  const fuelType = await prisma.st_combus_hc_based_emis.findMany({
    distinct: ["fuel_type"],
    select: {
      id: true,
      fuel_type: true,
    },
  });
  return NextResponse.json({ fuelType });
}

async function handleGetFuelSubTypes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fuelType } = req.body; // Extract fuelType from the query

  if (!fuelType) {
    return res.status(400).json({ error: "Fuel type is required" });
  }

  try {
    const fuelSubTypes = await prisma.st_combus_hc_based_emis.findMany({
      where: { fuel_type: fuelType },
      distinct: ["fuel_sub_type"],
      select: {
        id: true,
        fuel_sub_type: true,
      },
    });

    res.status(200).json(fuelSubTypes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

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

  return NextResponse.json({ fuelType, fuelSubType });
}
