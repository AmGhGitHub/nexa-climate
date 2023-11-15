import Scope1Form from "@/components/scope-emis/create-form";
import prisma from "@/prisma/client";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import { sql } from "@vercel/postgres";

export default async function Page() {
  //   const customers = await fetchCustomers();
  // const scope1_emission_src =
  //   await sql`SELECT * FROM scope1_emission_sources`;

  // //   const s= await prisma.$queryRaw`SELECT * FROM scope1_emission_sources`;

  // console.log(scope1_emission_src);

  const aa = await prisma.scope1_emission_sources.findMany({
    distinct: ["source"],
  });

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      /> */}
      <Scope1Form customers={aa} />
    </main>
  );
}
