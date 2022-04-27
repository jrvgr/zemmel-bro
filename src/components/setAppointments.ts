/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import type { Writable } from "svelte/store";
import { studentSchedule, teacherSchedule } from "@/api";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

function merge(array) {
  for (let i = 1; i < array.length; ) {
    if (array[i].start === array[i - 1].start) {
      const result = array.filter((item) => item.start === array[i - 1].start);
      array.splice(
        i - 1,
        result.length,
        result.sort((a, b) => {
          if (a.subjects < b.subjects) return -1;
          if (a.subjects > b.subjects) return 1;
          return 0;
        })
      );
    }
    i += 1;
  }
  return array;
}

export function getAppointments(
  currentWeek: Dayjs,
  appointments: Writable<Array<object>>,
  selectedUser: Record<string, unknown> & { code: string }
): void {
  if (selectedUser.employee) {
    teacherSchedule(selectedUser.code, currentWeek).then((data) => {
      appointments.set(
        data.data.response.data.sort((a, b) => a.start - b.start)
      );
    });
    return;
  }
  studentSchedule(selectedUser.code, currentWeek).then((data) => {
    appointments.set(
      merge(data.data.response.data.sort((a, b) => a.start - b.start))
    );
  });
}
