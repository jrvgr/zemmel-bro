import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { writable } from "svelte/store";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

export const week = writable(0);
export const selectedStudent = writable("~me");
export const currentWeek = writable<Dayjs>(dayjs());
export const appointments = writable([]);
export const selectedDay = writable<Dayjs>(dayjs().day(1));
