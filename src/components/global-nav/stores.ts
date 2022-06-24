import { writable } from "svelte/store";

// global states for global nav
export const showYearSelector = writable(false);
export const selectedYear = writable<{
  year: number;
  id: number;
  projectName: string;
}>();
export const showScheduleSelector = writable(false);
