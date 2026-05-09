// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind klaslaryny dinamiki we akylly birleşdirýän funksiýa.
 * Meselem: "bg-red-500 bg-blue-500" diýseň, iň soňky geleni awtomatik saýlaýar.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
