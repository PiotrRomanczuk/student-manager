import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function determineKey(firstChord: string): string {
  // Keep the chord as is for the key
  return firstChord.trim();
}