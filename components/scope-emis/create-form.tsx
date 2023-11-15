"use client";
import { getFuelsAndFuelSubTypes } from "@/lib/FetchData";

import { useState, useEffect } from "react";
import axios from "axios";

const fetchData = async () => {
  const { fuels, fuel_sub_types } = await axios.get("/api/emf");
  console.log(fuels);
};

import { scope1_emission_sources } from "@prisma/client";
// import { CustomerField } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Scope1Form({
  emis_srcs,
}: {
  emis_srcs: scope1_emission_sources[];
}) {
  const [selectedSource, setSelectedSource] = useState("");
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  // console.log(fuelTypes);
  const [fuelSubTypes, setFuelSubTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { fuels, fuel_sub_types } = await axios.get("/api/emf");
      setFuelTypes(fuels);
      setFuelSubTypes(fuel_sub_types);
    };

    fetchData();
  }, []);

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose a source
          </label>
          <div className="relative">
            <select
              id="emis_src"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={(e) => {
                setSelectedSource(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a source
              </option>
              {emis_srcs.map((emis_src) => (
                <option key={emis_src.id} value={emis_src.source}>
                  {emis_src.source}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {selectedSource === "Stationary Combustion" && (
          <>
            {/* Fuel Type Select */}
            <div className="mb-4">
              <label
                htmlFor="fuelType"
                className="mb-2 block text-sm font-medium"
              >
                Choose a Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Fuel Type
                </option>
                {fuelTypes.map((fuel, index) => (
                  <option key={index} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Subtype Select */}
            <div className="mb-4">{/* Select for Fuel Subtype */}</div>
          </>
        )}

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
