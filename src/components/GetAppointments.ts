import { onDestroy, onMount } from "svelte/internal";
import dayjs from "dayjs";

import { get, Writable } from "svelte/store";
import { studentSchedule } from "@/api";

export function getAppointments(
  currentWeek: Writable<string>,
  appointments: Writable<Array<object>>,
  selectedStudent: Writable<string>
): void {
  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  let week = get(currentWeek);
  let student = get(selectedStudent);

  onMount(() => {
    unsubscribe1 = currentWeek.subscribe((currentWeek) => {
      week = currentWeek;
      studentSchedule(student, week).then((data) => {
        appointments.set(data.data.response.data[0].appointments);
      });
    });
    unsubscribe2 = selectedStudent.subscribe((selectedStudent) => {
      student = selectedStudent;
      studentSchedule(student, week).then((data) => {
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
  selectedDay: string
): boolean {
  return appointments.some(
    (element) => dayjs(element.start * 1000).format("dddd") === selectedDay
  );
}
