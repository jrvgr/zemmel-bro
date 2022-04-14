import { api } from "./api";

export function getStudents(schoolYear) {
  return api.get("/users", {
    params: {
      isStudent: true,
      schoolInSchoolYear: schoolYear,
      fields:
        "code,firstName,prefix,lastName,email,username, schoolInSchoolYears",
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

export function getStudentInfo(student: string) {
  return api.get(`/users/${student}`);
}
