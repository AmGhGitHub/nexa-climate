import prisma from "@/prisma/client";
import { columns } from "./columns";
import { DataTable } from "@/components/emis-factors-data-table";

export default async function Example() {
  const st_combus_quant_based =
    await prisma.st_combus_quant_based_emis.findMany({
      orderBy: [{ fuel_type: "asc" }, { fuel_sub_type: "asc" }],
    });
  const st_comus_hc_based = await prisma.st_combus_hc_based_emis.findMany({
    orderBy: [{ fuel_type: "asc" }, { fuel_sub_type: "asc" }],
  });
  return (
    <>
      <div className="font-bold text-xl text-gray-700 mb-3 ml-10">
        Quantity based emission factors
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={st_combus_quant_based} />
      </div>

      <div className="font-bold text-xl text-gray-700 mb-3 ml-10">
        Heat Content based emission factors
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={st_comus_hc_based} />
      </div>
    </>
  );
}
