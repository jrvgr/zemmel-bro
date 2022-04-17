<script lang="ts">
  import dayjs from "dayjs";

  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { slide } from "svelte/transition";
  import { appointments, selectedDay, selectedStudent } from "@/stores";
  import Appointment from "@/components/Appointment.svelte";
  import CalendarInfo from "@/components/CalenderInfo.svelte";
  import { checkAppointmentsToday } from "@/components/GetAppointments";
  import WeekDaySelector from "@/components/WeekDaySelector.svelte";
  import { studentSchoolYears, getStudents } from "@/api";
  import Typeahead from "svelte-typeahead";
  import { Code, SortAsc } from "lucide-svelte";

  dayjs.extend(advancedFormat);

  let data = [];

  studentSchoolYears("~me").then((year) => {
    getStudents(year.data.response.data[0].schoolInSchoolYears[0]).then(
      (students) => {
        console.log(students);
        data = students.data.response.data;
      }
    );
  });

  let events = [];
</script>

<main>
  <CalendarInfo><WeekDaySelector /></CalendarInfo>
  {#key $appointments}
    <div class="appointments">
      {#each $appointments as appointment}
        {#if dayjs(appointment.start * 1000).weekday() - 1 === $selectedDay.day()}
          <div class="appointment" in:slide={{ duration: 1000 }}>
            <div class="left">
              <div class="top">
                <Appointment {appointment} fieldname="subjects" />
              </div>
              <div class="bottom">
                <Appointment {appointment} fieldname="locations" />
                <Appointment {appointment} fieldname="teachers" />
              </div>
            </div>
            <div class="right">
              <div class="top">
                <p>
                  {dayjs(appointment.start * 1000).format("HH:mm")} - {dayjs(
                    appointment.end * 1000
                  ).format("HH:mm")}
                </p>
              </div>
              <div class="bottom">
                {#if appointment.startTimeSlotName}
                  <p class="hour">
                    {appointment.startTimeSlotName.replace(/[^0-9]/g, "")}'e uur
                  </p>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      {/each}
      {#key appointments && $selectedDay}
        {#if !checkAppointmentsToday($appointments, $selectedDay)}
          <div class="appointment" in:slide={{ duration: 1000 }}>
            <p>we found no appointments for today</p>
          </div>
        {/if}
      {/key}
    </div>
  {/key}

  {#key data}
    <Typeahead
      label="U.S. States"
      placeholder={`Search U.S. states (e.g. "California")`}
      {data}
      extract={(student) => student.firstName + " " + student.lastName}
      disable={(item) => /Jacco/.test(item)}
      on:select={({ detail }) => (
        (events = [...events, detail]),
        selectedStudent.set(detail.original.code)
      )}
      on:clear={() => (events = [...events, "clear"])}
      let:result
      let:index
    />
  {/key}
</main>

<style lang="scss">
  .appointments {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .appointment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--popup_item-background);
    border-radius: 5px;
    color: var(--button-foreground);
    height: min-content;
    margin: 0 0.625em;
    padding: 0.625em;
    flex-wrap: wrap-reverse;
    align-items: flex-end;
    gap: 10px;
    p {
      margin: 0;
    }
    .left {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      justify-content: center;
      flex: 1 1 50%;

      .top {
        font-size: larger;
      }
      .bottom {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 0.5rem;
        font-size: 14px;
        width: inherit;
        flex-wrap: wrap;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: max-content;
      min-height: 100%;
      gap: 0.5em;
      .top {
        display: flex;
        font-size: larger;
        align-items: center;
        width: max-content;
      }
      .bottom {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.875em;
        flex-grow: 1;
        flex-basis: 0;
        align-content: space-around;
        .hour {
          display: flex;
          gap: 0.5em;
          padding: 0.3em;
          border-radius: 5px;
          background-color: var(--accent-green);
          color: #fff;
        }
      }
    }
  }
</style>
