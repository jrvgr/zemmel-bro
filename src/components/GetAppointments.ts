/* eslint-disable no-param-reassign */
import { onDestroy, onMount } from "svelte/internal";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { get, Writable } from "svelte/store";
import { userSchedule } from "@/api";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

function merge(array) {
  for (let i = 1; i < array.length; ) {
    if (array[i].start !== array[i - 1].start) {
      i += 1;
      // eslint-disable-next-line no-continue
      continue;
    }
    array[i].subjects = [array[i].subjects.join(" ")];
    array[i].teachers.push(...array[i - 1].teachers);
    array[i].subjects.push(...array[i - 1].subjects);
    array[i].locations.push(...array[i - 1].locations);
    array.splice(i - 1, 1);
  }
  return array;
}

// funtion ifarrayhasmultipleitemsreplacecommawithand(array) {
//   if (array.length > 1) {
//     return array.join(", ");
//   }
//   return array[0];
// }

export function getAppointments(
  currentWeek: Writable<Dayjs>,
  appointments: Writable<Array<object>>,
  selectedStudent: Writable<Record<string, unknown> & { code: string }>
): void {
  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  let week = get(currentWeek);
  let student = get(selectedStudent);

  onMount(() => {
    unsubscribe1 = currentWeek.subscribe((currentWeek) => {
      appointments.set([{}]);
      week = currentWeek;
      userSchedule(student.code, week).then((data) => {
        const array = merge(
          data.data.response.data.sort((a, b) => {
            return a.start - b.start;
          })
        );
        appointments.set(array);
      });
    });
    unsubscribe2 = selectedStudent.subscribe((selectedStudent) => {
      appointments.set([{}]);
      student = selectedStudent;
      userSchedule(student.code, week).then((data) => {
        const array = merge(
          data.data.response.data.sort((a, b) => {
            return a.start - b.start;
          })
        );
        appointments.set(array);
      });
    });
  });

  onDestroy(() => {
    unsubscribe1();
    unsubscribe2();
  });
}

export function checkAppointmentsToday(
  appointments: Array<Record<string, unknown> & { start: number }>,
  selectedDay: Dayjs
): boolean {
  return appointments.some(
    (element) =>
      dayjs(element.start * 1000).weekday() - 1 === selectedDay.weekday()
  );
}
