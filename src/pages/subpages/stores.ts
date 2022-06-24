import { writable } from "svelte/store";

export const showYearSelector = writable(false);
export const selectedYear = writable<{
  year: number;
  id: number;
  projectName: string;
}>();
