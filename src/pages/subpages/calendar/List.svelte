<script lang="ts">
  import dayjs from "dayjs";

  import { studentSchedule } from "@/api";
  import { week, selectedStudent, currentWeek, appointments } from "@/stores";
  import Appointment from "@components/Appointment.svelte";
  import isoWeek from "dayjs/plugin/isoWeek";
  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { onDestroy } from "svelte/internal";
  import CalendarInfo from "@components/CalendarInfo.svelte";

  dayjs.extend(isoWeek);
  dayjs.extend(advancedFormat);

  let lappointments = [];

  currentWeek.set(dayjs().format("YYYYWW"));

  let unsubscribe: Function = () => {};

  onMount(() => {
    unsubscribe = week.subscribe((week) => {
      const thisweek = week;
      if (thisweek > 0) {
        currentWeek.set(dayjs().add(thisweek, "w").format("YYYYWW"));
      }
      if (thisweek <= 0) {
        const nodash = parseInt(thisweek.toString().replace(/-/g, ""));
        currentWeek.set(dayjs().subtract(nodash, "w").format("YYYYWW"));
      }
      console.log($currentWeek);
      getAppointments($currentWeek);
    });
  });

  function getAppointments(currentWeek) {
    studentSchedule($selectedStudent.toString(), currentWeek.toString()).then(
      (data) => {
        lappointments = data.data.response.data[0].appointments;
        appointments.set(data.data.response.data[0].appointments);
        console.log(data);
        console.log(currentWeek);
      }
    );
  }

  onDestroy(() => {
    unsubscribe();
    console.log("destroyed");
  });
</script>

<main>
  <CalendarInfo />
  {#key lappointments}
    {#each lappointments as appointment}
      {#if dayjs(appointment.start * 1000).format("dddd") === "Tuesday"}
        <div class="appointment" in:slide={{ duration: 1000 }}>
          <div class="left">
            <div class="top">
              <Appointment {appointment} fieldname={"subjects"} />
            </div>
            <div class="bottom">
              <Appointment {appointment} fieldname={"locations"} />
              <Appointment {appointment} fieldname={"teachers"} />
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
  {/key}
</main>

<style lang="scss">
  .appointment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    background-color: var(--popup_item-background);
    border-radius: 5px;
    padding: 0 10px;
    color: var(--button-foreground);
    p {
      margin: 0;
    }
    .left {
      .top {
        display: flex;
        gap: 0.5em;
        padding: 0.7em 0;
        padding-bottom: 0;
        font-size: larger;
      }
      .bottom {
        display: flex;
        gap: 1rem;
        padding: 0.7em 0;
        align-items: center;
        font-size: 14px;
      }
    }
    .right {
      .top {
        display: flex;
        gap: 0.5em;
        padding: 0.7em 0;
        padding-bottom: 0;
        font-size: larger;
      }
      .bottom {
        display: flex;
        gap: 1rem;
        padding: 0.7em 0;
        align-items: center;
        font-size: 14px;
        flex-direction: row-reverse;
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
