import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input_date: Date) {
  // Assuming data.report_date is a Date object
  const year = input_date.getFullYear(); // Get the year
  const month = (input_date.getMonth() + 1).toString().padStart(2, "0"); // Get the month and format it
  const day = input_date.getDate().toString().padStart(2, "0"); // Get the date and format it

  // Combine year and month
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function roundNumber(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}
