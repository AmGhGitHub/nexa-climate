type Quantity = "mass" | "gas-volume" | "liquid-volume";

type MassUnits = "kg" | "ton" | "tonne" | "lbm"; // Add other mass units as needed
type GasVolumeUnits = "m3" | "liter" | "cf" | "mcf" | "mmcf" | "bcf"; // Add other gas volume units as needed
type LiquidVolumeUnits = "m3" | "bbl" | "gallon" | "liter"; // Add other liquid volume units as needed

type AllUnits = MassUnits | GasVolumeUnits | LiquidVolumeUnits;

type ConversionFactors = {
  [key in Quantity]: Record<string, number>;
};

const conversionFactors: ConversionFactors = {
  mass: {
    kg: 1, // base unit
    ton: 907.185, // 1 ton = 907.185 kg
    tonne: 1000, // 1 tonne (metric ton) = 1000 kg
    lbm: 0.453592, // 1 pound (mass) = 0.453592 kg
    // ... other units
  },
  "gas-volume": {
    m3: 1, // base unit
    liter: 0.001, // 1 liter = 0.001 m3
    cf: 0.0283168, // 1 cubic foot = 0.0283168 m3
    mcf: 28.3168, // 1 thousand cubic feet (Mcf) = 28.3168 m3
    mmcf: 28316.8, // 1 million cubic feet (MMcf) = 28316.8 m3
    bcf: 28316800, // 1 billion cubic feet (Bcf) = 28316800 m3
    // ... other units
  },
  "liquid-volume": {
    m3: 1, // base unit
    bbl: 0.158987, // 1 barrel = 0.158987 m3
    gallon: 0.00378541, // 1 gallon = 0.00378541 m3
    liter: 0.001, // 1 liter = 0.001 m3
    // ... other units
  },
};

// Define your conversion logic here
export function convertUnit(
  value: number,
  fromUnit: AllUnits,
  toUnit: AllUnits,
  quantity: Quantity
): number {
  const fromFactor = conversionFactors[quantity][fromUnit];
  const toFactor = conversionFactors[quantity][toUnit];

  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error(
      `Invalid unit type or unit: ${quantity}, ${fromUnit}, ${toUnit}`
    );
  }

  const factor = toFactor / fromFactor;
  return value * factor;
}
