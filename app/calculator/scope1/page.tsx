import {
  CreateEmission,
  DeleteEmission,
  UpdateEmission,
} from "@/components/ui/scopes/buttons";
import Search from "@/components/ui/scopes/search";
import { formatDate } from "@/lib/utils";
import prisma from "@/prisma/client";

const Page = async () => {
  const scp1_data = await prisma.scope1_emission_summary.findMany({});
  // console.log(scp1_data);
  return (
    <div>
      <h1 className="text-xl text-emerald-800">Scope 1 Summary</h1>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search emissions..." />
        <CreateEmission />
      </div>
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Report Date
            </th>
            {/* <th scope="col" className="px-3 py-5 font-medium">
              Emission Source
            </th> */}
            <th scope="col" className="px-3 py-5 font-medium">
              CO2 Emission (tCO2)
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              CH4 Emission (tCO2e)
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              N2O Emission (tCO2e)
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {scp1_data?.map((data) => (
            <tr
              key={data.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  {/* <Image
                    src={data.image_url}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`${data.name}'s profile picture`}
                  /> */}
                  <p>{formatDate(data.report_date)}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">{data.CO2_emis}</td>
              <td className="whitespace-nowrap px-3 py-3">{data.CH4_emis}</td>
              <td className="whitespace-nowrap px-3 py-3">{data.N2O_emis}</td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <UpdateEmission id={data.id} />
                  <DeleteEmission id={data.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
