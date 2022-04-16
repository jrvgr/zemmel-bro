import { onDestroy, onMount } from "svelte/internal";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { get, Writable } from "svelte/store";
import { studentSchedule } from "@/api";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

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
      studentSchedule(student, week.format("YYYYWW")).then((data) => {
        appointments.set(data.data.response.data[0].appointments);
      });
    });
    unsubscribe2 = selectedStudent.subscribe((selectedStudent) => {
      appointments.set([{}]);
      student = selectedStudent;
      studentSchedule(student, week.format("YYYYWW")).then((data) => {
        appointments.set(data.data.response.data[0].appointments);
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
      dayjs(element.start * 1000).format("d") === selectedDay.format("d")
  );
}
