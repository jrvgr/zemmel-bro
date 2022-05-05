import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeDate from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import { writable } from "svelte/store";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(localeDate);
dayjs.extend(weekday);

export const week = writable(0);
export const currentWeek = writable<Dayjs>(dayjs());
export const appointments = writable([]);
export const selectedUser = writable<
  Record<string, unknown> & { code: string }
>({ code: "~me", isEmployee: true });
export const selectedDay = writable<Dayjs>(dayjs().subtract(1, "day"));

// global states for global nav
export const showYearSelector = writable(false);
export const selectedYear = writable<{
  year: number;
  id: number;
  projectName: string;
}>();
export const showScheduleSelector = writable(false);
