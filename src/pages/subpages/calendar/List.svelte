<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";

  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { slide } from "svelte/transition";
  import { appointments, selectedDay } from "@/stores";
  import Appointment from "@/components/Appointment.svelte";
  import CalendarInfo from "@/components/CalenderInfo.svelte";
  import WeekDaySelector from "@/components/WeekDaySelector.svelte";

  dayjs.extend(advancedFormat);

  function areDaysSame(
    appointments: Array<Record<string, unknown> & { start: number }>,
    selectedDay: Dayjs
  ) {
    return appointments.some(
      (element) => dayjs(element.start * 1000).day() - 1 === selectedDay.day()
    );
  }
</script>

<main>
  <CalendarInfo><WeekDaySelector /></CalendarInfo>
  {#key $appointments}
    <div class="appointments">
      {#each $appointments as appointment}
        {#if dayjs(appointment.start * 1000).day() - 1 === $selectedDay.day()}
          <div
            class:cancelled={appointment.cancelled}
            class="appointment"
            in:slide={{ duration: 1000 }}
          >
            <div class="left">
              <div class="top">
                {#if appointment.subjects.length > 0}
                  <Appointment {appointment} fieldname="subjects" />
                {/if}
              </div>
              <div class="bottom">
                {#if appointment.locations.length > 0}
                  <Appointment {appointment} fieldname="locations" />
                {/if}
                {#if appointment.teachers.length > 0}
                  <Appointment {appointment} fieldname="teachers" />
                {/if}
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
      {#key $appointments && $selectedDay}
        {#if !areDaysSame($appointments, $selectedDay)}
          <div class="appointment" in:slide={{ duration: 1000 }}>
            <p>found no appointments for this day</p>
          </div>
        {/if}
      {/key}
    </div>
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
      flex-wrap: wrap;
      .top {
        font-size: larger;
        display: flex;
        flex-wrap: wrap;
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

  .cancelled {
    background-color: #ff7a7a;
    color: #fff;
  }
</style>
