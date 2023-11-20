"use client";
import axios from "axios";

import { scope1_emission_sources } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const formSchema = z.object({
  reportDate: z.date({
    required_error: "A date of record is required.",
  }),
  emisSource: z.string().min(4, {
    message: "A emission source is required.",
  }),
  emisCalculationBase: z.enum(["hc", "quantity"], {
    required_error: "A base for calculation is required.",
  }),
  fuelType: z.string().min(4, { message: "A fuel type is required." }),
  fuelSubType: z.string().min(4, { message: "A fuel sub type is required." }),
  unit: z.string().min(4, { message: "A unit is required." }),
  amount: z.number().min(0, { message: "An amount is required." }),
});

interface FuelTypeProps {
  id: string;
  fuel_type: string;
}

interface FuelSubTypeProps {
  id: string;
  fuel_sub_type: string;
  // per_unit: string;
}

interface ConsumpUnitProps {
  id: string;
  per_unit: string;
}

export default function ProfileForm({
  emis_srcs,
}: {
  emis_srcs: scope1_emission_sources[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportDate: new Date(),
      // emisSource: "Stationary Combustion",
      emisCalculationBase: "hc",
      fuelType: "Natural Gas",
      fuelSubType: "Pipeline",
      unit: "mmBTU/short-ton",
      amount: 1000,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post("/api/emf/st-combus/fuel-sub-type", values).then((res) => {
      console.log(res.data);
      toast({ title: "Emission entry created successfully!" });
      window.location.href = "/calculator/scope1";
    });
  }

  const [fuelTypes, setFuelTypes] = useState<FuelTypeProps[]>([]);
  const [fuelSubTypes, setFuelSubTypes] = useState<FuelSubTypeProps[]>([]);
  const [consumpUnits, setConsumpUnits] = useState<ConsumpUnitProps[]>([]);

  useEffect(() => {
    if (form.watch("emisSource") === "Stationary Combustion") {
      const emisCalcBase = form.watch("emisCalculationBase");
      const fetchData = async () => {
        const res = await axios.get("/api/emf/st-combus", {
          params: {
            emisCalculationBase: emisCalcBase,
          },
        });
        const { fuelType } = await res.data;
        setFuelTypes(fuelType);
      };

      fetchData();
    }
  }, [form.watch("emisCalculationBase"), form.watch("emisSource")]);

  useEffect(() => {
    const emisCalculationBase = form.watch("emisCalculationBase");
    const selectedFuelType = form.watch("fuelType");

    const fetchData = async () => {
      const res = await axios.get("/api/emf/st-combus/fuel-sub-type", {
        params: {
          emisCalculationBase,
          selectedFuelType,
        },
      });
      const { fuelSubTypes, units } = await res.data;
      // console.log(res.data);
      setFuelSubTypes(fuelSubTypes);
      setConsumpUnits(units);
    };

    fetchData();
  }, [form.watch("emisCalculationBase"), form.watch("fuelType")]);

  return (
    <>
      <h1 className="mb-5 text-xl text-teal-700 font-semibold">
        Scope 1 Emission Entry
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-gray-50 border-gray-300 border-2 rounded-lg p-4"
        >
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
          <FormField
            control={form.control}
            name="emisSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Emission Source:</FormLabel>
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
          {form.watch("emisSource") === "Stationary Combustion" && (
            <div className="flex flex-col flex-grow md:flex-row">
              <div className="flex flex-grow md:basis-1/4">
                <FormField
                  control={form.control}
                  name="emisCalculationBase"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-bold">
                        Base of Emission Calculations:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="hc" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Heat Content
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="quantity" />
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
              <div className="flex flex-grow md:basis-1/4">
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem className="min-w-[300px]">
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
              <div className="flex flex-grow md:basis-1/4">
                <FormField
                  control={form.control}
                  name="fuelSubType"
                  render={({ field }) => (
                    <FormItem className="min-w-[300px]">
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
              <div className="flex flex-grow md:basis-1/4">
                {consumpUnits && (
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="min-w-[300px]">
                        <FormLabel className="font-bold">Unit:</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {consumpUnits.map((item) => (
                              <SelectItem key={item.id} value={item.per_unit}>
                                {item.per_unit}
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
