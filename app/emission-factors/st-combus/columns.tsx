import { ColumnDef } from "@tanstack/react-table";
import { st_combus_quant_based_emis } from "@prisma/client";

export const columns: ColumnDef<st_combus_quant_based_emis>[] = [
  {
    accessorKey: "fuel_type",
    header: "Fuel Type",
  },
  {
    accessorKey: "fuel_sub_type",
    header: "Fuel Sub Type",
  },
  {
    accessorKey: "co2_emis_value",
    header: "CO2 Emis",
  },
  {
    accessorKey: "co2_emis_unit",
    header: "CO2 Emis Unit",
  },
  {
    accessorKey: "ch4_emis_value",
    header: "CH4 Emis",
  },
  {
    accessorKey: "ch4_emis_unit",
    header: "CH4 Emis Unit",
  },
  {
    accessorKey: "n2o_emis_value",
    header: "N2O Emis",
  },
  {
    accessorKey: "n2o_emis_unit",
    header: "N2O Emis Unit",
  },
];
