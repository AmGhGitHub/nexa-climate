"use client";
import axios from "axios";

import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { scope1_emission_sources } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

const formSchema = z.object({
  reportDate: z.date({
    required_error: "A date of record is required.",
  }),
  emisSource: z.string().min(4, {
    message: "A emission source is required.",
  }),
  fuelType: z.string().min(4, { message: "A fuel type is required." }),
  fuelSubType: z.string().min(4, { message: "A fuel sub type is required." }),
  unit: z.string().min(1, { message: "A unit is required." }),
  amount: z.number().min(0, { message: "An amount is required." }),
});

const fetchFuelTypes = async (emisSource: string) => {
  if (emisSource !== "Stationary Combustion") return [];
  try {
    const { data } = await axios.get("/api/st-combus?search=fuel-type");
    return data.res || [];
  } catch (error) {
    console.error("Error fetching fuel types:", error);
    return [];
  }
};

const fetchFuelSubTypes = async (fuelType: string) => {
  if (!fuelType) return [];
  try {
    const { data } = await axios.get(
      `/api/st-combus?search=fuel-sub-type&fuel-type=${fuelType}`
    );
    return data.res || [];
  } catch (error) {
    console.error("Error fetching fuel subtypes:", error);
    return [];
  }
};

const fetchConsumpUnits = async (fuelType: string, fuelSubType: string) => {
  if (!fuelType || !fuelSubType) return [];
  try {
    const { data } = await axios.get(
      `/api/st-combus?search=unit-type&fuel-type=${fuelType}&fuel-sub-type=${fuelSubType}`
    );
    return data.res || [];
  } catch (error) {
    console.error("Error fetching consumption units:", error);
    return [];
  }
};

interface FuelTypeProps {
  id: string;
  fuel_type: string;
}

interface FuelSubTypeProps {
  id: string;
  fuel_sub_type: string;
}

interface LegitUnitsProps {
  id: string;
  legit_unit: string;
}

export default function ProfileForm({
  emis_srcs,
}: {
  emis_srcs: scope1_emission_sources[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1000,
    },
  });

  const [fuelTypes, setFuelTypes] = useState<FuelTypeProps[]>([]);
  const [fuelSubTypes, setFuelSubTypes] = useState<FuelSubTypeProps[]>([]);
  const [consumpUnits, setConsumpUnits] = useState<LegitUnitsProps[]>([]);

  useEffect(() => {
    const emisSource = form.watch("emisSource");
    fetchFuelTypes(emisSource).then(setFuelTypes);
  }, [form.watch("emisSource")]);

  useEffect(() => {
    const fuelType = form.watch("fuelType");
    fetchFuelSubTypes(fuelType).then(setFuelSubTypes);
    setConsumpUnits([]);
  }, [form.watch("fuelType")]);

  useEffect(() => {
    const fuelType = form.watch("fuelType");
    const fuelSubType = form.watch("fuelSubType");
    fetchConsumpUnits(fuelType, fuelSubType).then(setConsumpUnits);
  }, [form.watch("fuelSubType"), form.watch("fuelType")]);

  const router = useRouter();
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/st-combus", values);
      // console.log(res.data);
      toast({ title: "Emission entry created successfully!" });
      // https://stackoverflow.com/questions/69936157/how-to-trigger-hard-refresh-when-redirecting-to-a-different-page-in-next-js
      // window.location.href = "/calculator/scope1";
      router.push("/calculator/scope1");
    } catch (error: any) {
      toast({
        title: "Error submitting form",
        description: error.message,
      });
    }
  }, []);

  return (
    <>
      <h1 className="mb-5 text-2xl text-zinc-800 font-semibold">
        Scope 1 Emission Entry
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 bg-gray-50 border-gray-300 border-2 rounded-lg p-4"
        >
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="flex flex-col mb-4 md:mb-0 md:mr-4">
              <FormField
                control={form.control}
                name="reportDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-bold">Record Date</FormLabel>
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
            </div>
            <div className="flex flex-col w-[240px]">
              <FormField
                control={form.control}
                name="emisSource"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-bold">
                      Emission Source:
                    </FormLabel>
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
            </div>
          </div>

          {form.watch("emisSource") === "Stationary Combustion" && (
            <div className="flex flex-col md:flex-row md:space-x-10">
              <div className="flex flex-col w-[240px]">
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">Fuel Type:</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fuelTypes.map((item) => (
                            <SelectItem key={item.id} value={item.fuel_type}>
                              {item.fuel_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-[240px]">
                <FormField
                  control={form.control}
                  name="fuelSubType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">Fuel SubType:</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fuelSubTypes.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.fuel_sub_type}
                            >
                              {item.fuel_sub_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-[240px]">
                {consumpUnits && (
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Unit:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {consumpUnits.map((item) => (
                              <SelectItem key={item.id} value={item.legit_unit}>
                                {item.legit_unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          )}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Consumption Amount:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
