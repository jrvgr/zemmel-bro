import { getStudentInfo } from "@/api";

export async function getStudentName(student: string): Promise<string> {
  const output = await getStudentInfo(student);

  const studentInfo = output.data.response.data[0];

  if (studentInfo.prefix) {
    return `${studentInfo.firstName} ${studentInfo.prefix} ${studentInfo.lastName}`;
  }
  return `${studentInfo.firstName} ${studentInfo.lastName}`;
}
