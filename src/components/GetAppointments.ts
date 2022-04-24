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
    if (array[i].subjects === array[i - 1].subjects) array.splice(i, 1);
    if (array[i].start === array[i - 1].start) {
      array[i].subjects = [array[i].subjects.join(" ")];
      array[i].teachers.push(...array[i - 1].teachers);
      array[i].subjects.push(...array[i - 1].subjects);
      array[i].locations.push(...array[i - 1].locations);
      array.splice(i - 1, 1);
    } else i += 1;
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
        merge(data.data.response.data.sort((a, b) => a.start - b.start))
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
