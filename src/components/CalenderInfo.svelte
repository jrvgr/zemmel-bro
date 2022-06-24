<script lang="ts">
  import { currentWeek, selectedDay, selectedUser, weekOffset } from "@/stores";
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { getUserName } from "./users";

  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  function getWeek(week: number) {
    if (!week) return "This Week";
    if (week === -1) return "Last Week";
    if (week === 1) return "Next Week";
    if (week < 0) return `${Math.abs(week)} weeks ago`;
    if (week > 0) return `${week} weeks from now`;
  }
</script>

<main>
  <div class="week-info">
    <p class="weekstart">
      {getWeek($weekOffset)}
      on
      {$currentWeek.day($selectedDay.add(1, "d").day()).format("MMM DD")}
    </p>
  </div>
  <slot />
  <div class="selected-schedule">
    <p>Schedule for: {getUserName($selectedUser)}</p>
  </div>
</main>

<style lang="scss">
  p {
    margin: 0;
  }
  main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    flex: 1;
    color: var(--button-foreground);
    flex-wrap: wrap-reverse;
    @media (max-width: 800px) {
      flex-direction: column;
      gap: 0.4rem;
    }
  }
  main * {
    display: flex;
    justify-content: center;
  }
  .selected-schedule,
  .week-info {
    flex-grow: 1;
    flex-basis: 0;
    @media screen and (min-width: 768px) {
      flex-direction: row-reverse;
    }
  }
  .selected-schedule {
    display: flex;
    text-align: end;
  }
</style>
