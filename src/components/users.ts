import { get } from "svelte/store";
import { getUserInfo } from "@/api";
import { appointments, selectedUser, currentWeek } from "@/stores";
import { getAppointments } from "./setAppointments";

export function getUserName(user: Record<string, any>): string {
  return `${user.firstName || ""} ${user.prefix || ""} ${user.lastName || ""}`;
}

export async function setSelectedStudentDefault(): Promise<void> {
  selectedUser.set((await getUserInfo("~me")).data.response.data[0]);
  getAppointments(get(currentWeek), appointments, get(selectedUser));
}
