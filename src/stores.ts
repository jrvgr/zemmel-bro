import { writable } from "svelte/store";

export const week = writable(0);
export const selectedStudent = writable("~me");
export const currentWeek = writable();
export const appointments = writable([]);
export const currentDay = writable();
