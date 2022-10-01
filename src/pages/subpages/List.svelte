<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import AppointmentRow from "@/components/list-items/index.svelte";

  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { slide } from "svelte/transition";
  import { appointments, selectedDay } from "@/stores";
  import CalendarInfo from "@/components/CalenderInfo.svelte";
  import WeekDaySelector from "@/components/WeekDaySelector.svelte";
  import MediaQuery from "svelte-media-query";
  import Toolbar from "@/components/toolbar/index.svelte"


  dayjs.extend(advancedFormat);

  function areDaysSame(
    appointments: Array<Record<string, unknown> & { start: number }>,
    selectedDay: Dayjs
  ) {
    return appointments.some(
      (element) => dayjs(element.start * 1000).day() - 1 === selectedDay.day()
    );
  }

  function getNumberWithOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
</script>

<main>
  <CalendarInfo><WeekDaySelector /></CalendarInfo>
  {#key $appointments}
    <div class="appointments">
      {#each $appointments as appointment}
          {#if Array.isArray(appointment) && dayjs(appointment[0].start * 1000).day() - 1 === $selectedDay.day()}
            <AppointmentRow {appointment} grouped />
          {:else if dayjs(appointment.start * 1000).day() - 1 === $selectedDay.day()}
            <AppointmentRow {appointment} />
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
  <MediaQuery query="(max-width: 800px)" let:matches>
    <Toolbar {matches} />
  </MediaQuery>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }

  .appointments {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 100%;
    flex-grow: 1;
    @media (max-width: 800px) {
      margin-bottom: 4.5em;
    }
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
  }
</style>
