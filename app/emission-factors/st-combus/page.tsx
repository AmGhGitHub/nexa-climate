import prisma from "@/prisma/client";
import { columns } from "./columns";
import { DataTable } from "@/components/emis-factors-data-table";

export default async function Example() {
  const st_combus = await prisma.st_combus_quant_based_emis.findMany();

  return (
    <div>
      <h1 className="font-bold text-red-500">dr</h1>
      <div className="container mx-auto">
        <DataTable columns={columns} data={st_combus} />
      </div>
    </div>
  );
}
