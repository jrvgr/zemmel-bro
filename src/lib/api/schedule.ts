import { api } from "./lib";

export function studentSchedule(student: string, week) {
  return api.get("/liveschedule", {
    params: { student, week },
  });
}

export function teacherSchedule(teacher: string, week) {
  return api.get("/liveschedule", {
    params: { teacher, week },
  });
}
