import { getUserInfo } from "@/api";
import { selectedUser } from "@/stores";

export function getUserName(user: Record<string, any>): string {
  return `${user.firstName || ""} ${user.prefix || ""} ${user.lastName || ""}`;
}

export function setSelectedStudentDefault(): void {
  getUserInfo("~me").then((data) => {
    selectedUser.set(data.data.response.data[0]);
  });
}
