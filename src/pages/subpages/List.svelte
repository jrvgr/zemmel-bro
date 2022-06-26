<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";

  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { slide } from "svelte/transition";
  import { appointments, selectedDay } from "@/stores";
  import Appointment from "@/components/Appointment.svelte";
  import CalendarInfo from "@/components/CalenderInfo.svelte";
  import WeekDaySelector from "@/components/WeekDaySelector.svelte";
  import MediaQuery from "svelte-media-query";
  import Transition from "@/components/NavTransition.svelte";
  import MobileCalenderNav from "@/components/toolbar/MobileCalendarNav.svelte";

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
          <div class="appointment grouped" in:slide={{ duration: 1000 }}>
            <div class="left">
              <div class="top">
                <div class="subjects">
                  {#each appointment as appointment}
                    <Appointment {appointment} fieldname="subjects" />
                  {/each}
                </div>
              </div>
              <div class="bottom">
                <div class="locations">
                  {#each appointment as appointment}
                    <Appointment {appointment} fieldname="locations" />
                  {/each}
                </div>
                <div class="teachers">
                  {#each appointment as appointment}
                    <Appointment {appointment} fieldname="teachers" />
                  {/each}
                </div>
              </div>
            </div>
            <div class="right">
              <div class="top">
                <p>
                  {dayjs(appointment[0].start * 1000).format("HH:mm")} - {dayjs(
                    appointment[0].end * 1000
                  ).format("HH:mm")}
                </p>
              </div>
              <div class="bottom">
                {#if appointment[0].startTimeSlotName}
                  <p class="hour">
                    {getNumberWithOrdinal(appointment[1].startTimeSlotName.replace(/[^0-9]/g, ""))} hour
                  </p>
                {/if}
              </div>
            </div>
          </div>
        {/if}
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
                <div class="locations">
                  {#if appointment.locations.length > 0}
                    <Appointment {appointment} fieldname="locations" />
                  {/if}
                </div>
                <div class="teachers">
                  {#if appointment.teachers.length > 0}
                    <Appointment {appointment} fieldname="teachers" />
                  {/if}
                </div>
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
                    {getNumberWithOrdinal(appointment.startTimeSlotName.replace(/[^0-9]/g, ""))} hour
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
  <div class="toolbar">
    <MediaQuery query="(max-width: 800px)" let:matches>
      {#if matches}
        <Transition>
          <MobileCalenderNav />
        </Transition>
      {/if}
    </MediaQuery>
  </div>
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
    .left {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      justify-content: center;
      flex: 1 1 50%;
      flex-wrap: wrap;
      overflow: visible;
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

  .grouped {
    border-left: var(--accent-gray) solid 5px;
    position: relative;
    transition: all 0.5s;
    transform-origin: right;
    .left::before {
      content: "Grouped";
      display: block;
      position: absolute;
      // left: -82.5px;
      right: calc(100% + 15px);
      top: 37.5%;
      font-size: large;
      z-index: 10;
      transition: all 0.25s;
      transform: scale(0);
      transform-origin: center;
    }
    &:hover {
      border-left: var(--accent-gray) solid 100px;
      .left::before {
        transform: scale(1);
        transition: all 0.3s;
      }
    }
  }

  .cancelled {
    background-color: var(--accent-red-lighter);
    color: #fff;
  }

  .teachers {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-blue);
    width: max-content;
    flex-wrap: wrap;
    :global(p) {
      color: #fff;
    }
    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
  .locations {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-red);
    flex-wrap: wrap;
    :global(p) {
      color: #fff;
    }
    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
  .subjects {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    :global(p) {
      white-space: pre-wrap;
    }

    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: var(--header-background);
    padding: 10px 0;
  }
</style>
