/* eslint-disable no-param-reassign */
import { onDestroy, onMount } from "svelte/internal";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { get, Writable } from "svelte/store";
import { studentSchedule } from "@/api";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

function merge(array) {
  for (let i = 1; i < array.length; ) {
    if (array[i].start === array[i - 1].start) {
      array[i].teachers.push(...array[i - 1].teachers);
      array[i].subjects.push(...array[i - 1].subjects);
      array[i].locations.push(...array[i - 1].locations);
      // array.splice(i - 1, 1);
    }
    i += 1;
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
  selectedStudent: Writable<string>
): void {
  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  let week = get(currentWeek);
  let student = get(selectedStudent);

  onMount(() => {
    unsubscribe1 = currentWeek.subscribe((currentWeek) => {
      appointments.set([{}]);
      week = currentWeek;
      studentSchedule(student, week).then((data) => {
        // appointments.set(
        //   data.data.response.data.sort((a, b) => {
        //     return a.start - b.start;
        //   })
        // );
        // console.log(
        //   data.data.response.data.sort((a, b) => {
        //     return a.start - b.start;
        //   })
        // );
        const array = merge(
          data.data.response.data.sort((a, b) => {
            return a.start - b.start;
          })
        );
        console.log(array);
        appointments.set(array);
      });
    });
    unsubscribe2 = selectedStudent.subscribe((selectedStudent) => {
      appointments.set([{}]);
      student = selectedStudent;
      studentSchedule(student, week).then((data) => {
        const array = merge(
          data.data.response.data.sort((a, b) => {
            return a.start - b.start;
          })
        );
        console.log(array);
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
