import { api } from "./api";

export function studentSchedule(student: string, week: string) {
  return api.get("/liveschedule", {
    params: { student, week },
  });
}

export function teacherSchedule(teacher: string, week: string) {
  return api.get("/liveschedule", {
    params: { teacher, week },
  });
}
