import { api } from "./api";

export function getStudents(schoolYear) {
  return api.get("/users", {
    params: {
      archived: false,
      isStudent: true,
      schoolInSchoolYear: schoolYear,
      fields: "archived,code,firstName,prefix,lastName",
    },
  });
}

export function getTeachers(schoolYear) {
  return api.get("/users", {
    params: {
      archived: "false",
      isEmployee: "true",
      schoolInSchoolYear: schoolYear,
      fields: "code,prefix,lastName",
    },
  });
}

export function getUserInfo(student: string) {
  return api.get(`/users/${student}`);
}
