// "use client";

// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { useEffect, useState } from "react";

// import { scope1_emission_sources } from "@prisma/client";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

// import axios from "axios";
// import Link from "next/link";

// interface FuelTypeProps {
//   id: string;
//   fuel_type: string;
// }

// interface FuelSubTypeProps {
//   id: string;
//   fuel_sub_type: string;
// }

// export default function Scope1Form(
// {
//   emis_srcs,
// }: {
//   emis_srcs: scope1_emission_sources[];
// }) {
//   const [selectedSource, setSelectedSource] = useState("");
//   const [fuelTypes, setFuelTypes] = useState<FuelTypeProps[]>([]);
//   const [fuelSubTypes, setFuelSubTypes] = useState<FuelSubTypeProps[]>([]);
//   const [emisCalculationBase, setEmisCalculationBase] = useState("hc");
//   const [selectedFuelType, setSelectedFuelType] = useState("");

//   useEffect(() => {
//     if (selectedSource === "Stationary Combustion") {
//       const fetchData = async () => {
//         const res = await axios.get("/api/emf/st-combus", {
//           params: {
//             emisCalculationBase,
//           },
//         });
//         const { fuelType } = await res.data;
//         setFuelTypes(fuelType);
//       };

//       fetchData();
//     }
//   }, [selectedSource, emisCalculationBase]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get("/api/emf/st-combus/fuel-sub-type", {
//         params: {
//           emisCalculationBase,
//           selectedFuelType,
//         },
//       });
//       const { fuelSubTypes } = await res.data;
//       setFuelSubTypes(fuelSubTypes);
//     };

//     fetchData();
//   }, [selectedFuelType, emisCalculationBase]);

//   return (
//     <>
//       <h1 className="mb-5 text-lg font-bold text-amber-600">
//         Add emission element for scope 1
//       </h1>
//       <form>
//         <div className="rounded-md bg-gray-50 p-4 md:p-6">
//           <div className="mb-4">
//             <label
//               htmlFor="customer"
//               className="mb-2 block text-sm font-medium"
//             >
//               Emission Report Date
//             </label>
//             <div className="relative">
//               <select
//                 id="emis_src"
//                 name="customerId"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                 defaultValue=""
//                 onChange={(e) => {
//                   setSelectedSource(e.target.value);
//                 }}
//               >
//                 <option value="" disabled>
//                   Select a emission source
//                 </option>
//                 {emis_srcs.map((emis_src) => (
//                   <option key={emis_src.id} value={emis_src.source}>
//                     {emis_src.source}
//                   </option>
//                 ))}
//               </select>
//               {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="customer"
//               className="mb-2 block text-sm font-medium"
//             >
//               Emission Source
//             </label>
//             <div className="relative">
//               <select
//                 id="emis_src"
//                 name="customerId"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                 defaultValue=""
//                 onChange={(e) => {
//                   setSelectedSource(e.target.value);
//                 }}
//               >
//                 <option value="" disabled>
//                   Select a emission source
//                 </option>
//                 {emis_srcs.map((emis_src) => (
//                   <option key={emis_src.id} value={emis_src.source}>
//                     {emis_src.source}
//                   </option>
//                 ))}
//               </select>
//               {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
//             </div>
//           </div>

//           {selectedSource === "Stationary Combustion" && (
//             <>
//               <label
//                 htmlFor="customer"
//                 className="mb-2 block text-sm font-medium"
//               >
//                 Base of Calculations
//               </label>
//               <div className="bg-white p-3 rounded-lg">
//                 <RadioGroup
//                   defaultValue={emisCalculationBase}
//                   orientation="horizontal"
//                   onValueChange={(e) => {
//                     setEmisCalculationBase(e);
//                     setFuelTypes([]);
//                   }}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="hc" id="option-one" />
//                     <Label htmlFor="option-one">Heat Content</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="quantity" id="option-two" />
//                     <Label htmlFor="option-two">Quantity</Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Fuel Type Select */}
//               <div className="my-4">
//                 <label
//                   htmlFor="fuelType"
//                   className="mb-2 block text-sm font-medium"
//                 >
//                   Fuel Type
//                 </label>
//                 <select
//                   id="fuelType"
//                   name="fuelType"
//                   className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                   defaultValue=""
//                   onChange={(e) => setSelectedFuelType(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Select Fuel Type
//                   </option>
//                   {fuelTypes &&
//                     fuelTypes.map((fuel) => (
//                       <option key={fuel.id} value={fuel.fuel_type}>
//                         {fuel.fuel_type}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               {/* Fuel Subtype Select */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="fuelType"
//                   className="mb-2 block text-sm font-medium"
//                 >
//                   Fuel Subtype
//                 </label>
//                 <select
//                   id="fuelSubType"
//                   name="fuelSubType"
//                   className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Fuel Sub Type
//                   </option>
//                   {fuelSubTypes &&
//                     fuelSubTypes.map((fuel) => (
//                       <option key={fuel.id} value={fuel.fuel_sub_type}>
//                         {fuel.fuel_sub_type}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               {/* Fuel Subtype Select */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="fuelType"
//                   className="mb-2 block text-sm font-medium"
//                 >
//                   Unit
//                 </label>
//                 <select
//                   id="unit"
//                   name="unit"
//                   className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Unit
//                   </option>
//                   {/* {fuelSubTypes.map((fuel) => (
//                     <option key={fuel.id} value={fuel.fuel_sub_type}>
//                       {fuel.fuel_sub_type}
//                     </option>
//                   ))} */}
//                 </select>
//               </div>
//             </>
//           )}

//           {/* Invoice Amount */}
//           <div className="mb-4">
//             <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//               Amount
//             </label>
//             <div className="relative mt-2 rounded-md">
//               <div className="relative">
//                 <input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   step="0.01"
//                   className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Invoice Status */}
//         </div>
//         <div className="mt-6 flex justify-end gap-4">
//           <Link
//             href="/dashboard/invoices"
//             className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//           >
//             Cancel
//           </Link>
//           <Button type="submit">Add Emission</Button>
//         </div>
//       </form>
//     </>
//   );
// }

"use client";

import { scope1_emission_sources } from "@prisma/client";

import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  recordDate: z.date({
    required_error: "A date of record is required.",
  }),
  emissionSource: z.string().min(4, {
    message: "A emission source is required.",
  }),
  baseCalculation: z.string().min(4, {
    message: "A base for calculation is required.",
  }),
  fuelType: z.string().min(4, { message: "A fuel type is required." }),
  fuelSubType: z.string().min(4, { message: "A fuel sub type is required." }),
  unit: z.string().min(4, { message: "A unit is required." }),
  amount: z.number().min(0, { message: "An amount is required." }),
});

export default function ProfileForm({
  emis_srcs,
}: {
  emis_srcs: scope1_emission_sources[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emissionSource: "Stationary Combustion",
      baseCalculation: "hc",
      fuelType: "Natural Gas",
      fuelSubType: "Pipeline",
      unit: "mmBTU/short-ton",
      amount: 1000,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 border-gray-300 border-2 rounded-lg p-4"
      >
        <FormField
          control={form.control}
          name="recordDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Record Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emissionSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emission Source:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {emis_srcs.map((emis_src) => (
                    <SelectItem key={emis_src.id} value={emis_src.source}>
                      {emis_src.source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("emissionSource") === "Stationary Combustion" && (
          <div className="flex space-x-10">
            <div className="flex">
              <FormField
                control={form.control}
                name="baseCalculation"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Base of Calculations:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Heat Content
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mentions" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Quantity
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Source:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {emis_srcs.map((emis_src) => (
                          <SelectItem key={emis_src.id} value={emis_src.source}>
                            {emis_src.source}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="fuelSubType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Source:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* {emis_srcs.map((emis_src) => (
                          <SelectItem key={emis_src.id} value={emis_src.source}>
                            {emis_src.source}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumption Amount:</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
