import { api } from "./api";

export function allSchoolYears() {
  return api.get("/schoolsinschoolyears", {
    params: {
      archived: false,
      fields: "id,projectName,year,school",
    },
  });
}

export function studentSchoolYears(student: number | string) {
  return api.get(`/users/${student}`, {
    params: {
      fields: "schoolInSchoolYears",
    },
  });
}
