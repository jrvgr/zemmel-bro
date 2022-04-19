import { getStudentInfo } from "@/api";
import { selectedStudent } from "@/stores";

export function getStudentName(student: Record<string, any>): string {
  const studentInfo = student;

  if (studentInfo.prefix) {
    return `${studentInfo.firstName} ${studentInfo.prefix} ${studentInfo.lastName}`;
  }
  return `${studentInfo.firstName} ${studentInfo.lastName}`;
}

export async function setSelectedStudentDefault(): Promise<void> {
  getStudentInfo("~me").then((data) => {
    selectedStudent.set(data.data.response.data[0]);
  });
}
