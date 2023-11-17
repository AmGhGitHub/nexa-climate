import Scope1Form from "@/components/ui/scope-emis/create-form";
import prisma from "@/prisma/client";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import { sql } from "@vercel/postgres";

export default async function Page() {
  const scope1_emission_sources = await prisma.scope1_emission_sources.findMany(
    {
      distinct: ["source"],
      // orderBy: { source: "asc" },
    }
  );

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
      <Scope1Form emis_srcs={scope1_emission_sources} />
    </main>
  );
}
