import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { api } from "./api";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(advancedFormat);

export function studentSchedule(user: string, week: Dayjs) {
  return api.get("/appointments", {
    params: {
      possibleStudents: user,
      valid: true,
      start: week.weekday(0).format("X"),
      end: week.weekday(6).format("X"),
      fields:
        "start,end,startTimeSlotName,type,teachers,subjects,groups,locations,remark,schedulerRemark,changeDescription,cancelled,teacherChanged,timeChanged,locationChanged,choosableInDepartmentCodes",
    },
  });
}

export function teacherSchedule(user: string, week: Dayjs) {
  return api.get("/appointments", {
    params: {
      user,
      valid: true,
      start: week.weekday(0).format("X"),
      end: week.weekday(6).format("X"),
      fields:
        "start,end,startTimeSlotName,type,teachers,subjects,groups,locations,remark,schedulerRemark,changeDescription,cancelled,teacherChanged,timeChanged,locationChanged,choosableInDepartmentCodes",
    },
  });
}
