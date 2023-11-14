"use client";

import SortingButton from "@/components/data-table/data-table-sorting";
import {
  st_combus_hc_based_emis,
  st_combus_heat_content,
  st_combus_quant_based_emis,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const col_st_combus_hc_based_emis: ColumnDef<st_combus_hc_based_emis>[] =
  [
    {
      accessorKey: "fuel_type",
      header: ({ column }) => (
        <SortingButton column={column}>Fuel Type</SortingButton>
      ),
    },
    {
      accessorKey: "fuel_sub_type",
      header: ({ column }) => (
        <SortingButton column={column}>Fuel SubType</SortingButton>
      ),
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

export const col_st_combus_quant_based_emis: ColumnDef<st_combus_quant_based_emis>[] =
  [
    {
      accessorKey: "fuel_type",
      header: ({ column }) => (
        <SortingButton column={column}>Fuel Type</SortingButton>
      ),
    },
    {
      accessorKey: "fuel_sub_type",
      header: ({ column }) => (
        <SortingButton column={column}>Fuel SubType</SortingButton>
      ),
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

export const col_st_hc: ColumnDef<st_combus_heat_content>[] = [
  {
    accessorKey: "fuel_type",
    header: ({ column }) => (
      <SortingButton column={column}>Fuel Type</SortingButton>
    ),
  },
  {
    accessorKey: "fuel_sub_type",
    header: ({ column }) => (
      <SortingButton column={column}>Fuel SubType</SortingButton>
    ),
  },
  {
    accessorKey: "hc_value",
    header: "HC Value",
  },
  {
    accessorKey: "hc_unit",
    header: "HC Unit",
  },
];
