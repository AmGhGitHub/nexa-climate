"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useEffect, useState } from "react";

import { scope1_emission_sources } from "@prisma/client";
// import { CustomerField } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Link from "next/link";

interface FuelTypeProps {
  id: string;
  fuel_type: string;
}

interface FuelSubTypeProps {
  id: string;
  fuel_sub_type: string;
}

export default function Scope1Form({
  emis_srcs,
}: {
  emis_srcs: scope1_emission_sources[];
}) {
  const [selectedSource, setSelectedSource] = useState("");
  const [fuelTypes, setFuelTypes] = useState<FuelTypeProps[]>([]);
  const [fuelSubTypes, setFuelSubTypes] = useState<FuelSubTypeProps[]>([]);
  const [emisCalculationBase, setEmisCalculationBase] = useState("hc");
  const [selectedFuelType, setSelectedFuelType] = useState("");

  useEffect(() => {
    if (selectedSource === "Stationary Combustion") {
      const fetchData = async () => {
        const res = await axios.get("/api/emf/st-combus", {
          params: {
            emisCalculationBase,
          },
        });
        const { fuelType } = await res.data;
        console.log(fuelType);
        setFuelTypes(fuelType);
      };

      fetchData();
    }
  }, [selectedSource, emisCalculationBase]);

  useEffect(() => {
    if (selectedSource === "Stationary Combustion") {
      const fetchData = async () => {
        const res = await axios.get("/api/emf/st-combus/fuel-sub-type", {
          params: {
            emisCalculationBase,
            selectedFuelType,
          },
        });
        const { fuelSubTypes } = await res.data;
        setFuelSubTypes(fuelSubTypes);
      };

      fetchData();
    }
  }, [selectedFuelType]);

  return (
    <>
      <h1 className="mb-5 text-lg text-orange-800">
        Add emission element for scope 1
      </h1>
      <form>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Emission Source
            </label>
            <div className="relative">
              <select
                id="emis_src"
                name="customerId"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select a emission source
                </option>
                {emis_srcs.map((emis_src) => (
                  <option key={emis_src.id} value={emis_src.source}>
                    {emis_src.source}
                  </option>
                ))}
              </select>
              {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
            </div>
          </div>

          {selectedSource === "Stationary Combustion" && (
            <>
              <label
                htmlFor="customer"
                className="mb-2 block text-sm font-medium"
              >
                Base of Calculations
              </label>
              <div className="bg-white p-3 rounded-lg">
                <RadioGroup
                  defaultValue={emisCalculationBase}
                  orientation="horizontal"
                  onValueChange={(e) => setEmisCalculationBase(e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hc" id="option-one" />
                    <Label htmlFor="option-one">Heat Content</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quantity" id="option-two" />
                    <Label htmlFor="option-two">Quantity</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Fuel Type Select */}
              <div className="my-4">
                <label
                  htmlFor="fuelType"
                  className="mb-2 block text-sm font-medium"
                >
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Fuel Type
                  </option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel.id} value={fuel.fuel_type}>
                      {fuel.fuel_type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Subtype Select */}
              <div className="mb-4">
                <label
                  htmlFor="fuelType"
                  className="mb-2 block text-sm font-medium"
                >
                  Fuel Subtype
                </label>
                <select
                  id="fuelSubType"
                  name="fuelSubType"
                  className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Fuel Sub Type
                  </option>
                  {fuelSubTypes.map((fuel) => (
                    <option key={fuel.id} value={fuel.fuel_sub_type}>
                      {fuel.fuel_sub_type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Invoice Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Amount
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Invoice Status */}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Add Emission</Button>
        </div>
      </form>
    </>
  );
}
