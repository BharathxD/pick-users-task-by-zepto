import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

const sanitizeValue = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export { cn, sanitizeValue };
