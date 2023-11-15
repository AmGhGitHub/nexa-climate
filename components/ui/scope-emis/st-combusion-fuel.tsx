"use client";

import axios from "axios";

const StationaryComustionFuel = async () => {
  const res = await axios.get("/api/getFuelTypes");
  const { fuelTypes } = await res.data;

  return (
    <>
      {/* Fuel Type Select */}
      <div className="mb-4">
        <label htmlFor="fuelType" className="mb-2 block text-sm font-medium">
          Fuel Type
        </label>
        <select
          id="fuelType"
          name="fuelType"
          className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
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
        <label htmlFor="fuelType" className="mb-2 block text-sm font-medium">
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
  );
};

export default StationaryComustionFuel;
