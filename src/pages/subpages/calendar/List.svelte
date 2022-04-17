<script lang="ts">
  import dayjs from "dayjs";

  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { slide } from "svelte/transition";
  import { appointments, selectedDay } from "@/stores";
  import Appointment from "@/components/Appointment.svelte";
  import CalendarInfo from "@/components/CalenderInfo.svelte";
  import { checkAppointmentsToday } from "@/components/GetAppointments";
  import WeekDaySelector from "@/components/WeekDaySelector.svelte";
  import { Smile } from "lucide-svelte";

  dayjs.extend(advancedFormat);
</script>

<main>
  <CalendarInfo><WeekDaySelector /></CalendarInfo>
  {#key $appointments}
    <div class="appointments">
      {#each $appointments as appointment}
        {#if dayjs(appointment.start * 1000).format("d") === $selectedDay.format("d")}
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
      {#key appointments && $selectedDay}
        {#if !checkAppointmentsToday($appointments, $selectedDay)}
          <div class="appointment" in:slide={{ duration: 1000 }}>
            <p>we found no appointments for today</p>
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
    margin: 0 0.625em;
    padding: 0.625em;
    flex-wrap: wrap-reverse;
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
      min-width: max-content;
      flex: 0 1 auto;
      .top {
        font-size: larger;
      }
      .bottom {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.875em;
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
