<script lang="ts">
  import { currentWeek, selectedDay, selectedUser } from "@/stores";
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { getUserName } from "./users";

  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  function getWeek() {
    const diff = dayjs().diff($currentWeek, "w");
    if (diff === 0) return "This Week";
    if (diff === 1) return "Last Week";
    if (diff === -1) return "Next Week";
    if (diff > 0) return `${diff} weeks ago`;
    if (diff < 0) return `${Math.abs(diff)} weeks from now`;
  }
</script>

<main>
  <div class="week-info">
    {#key $currentWeek}
      <p class="weekstart">
        {getWeek()}
        on
        {$currentWeek.day($selectedDay.add(1, "d").day()).format("MMM DD")}
      </p>
    {/key}
  </div>
  <slot />
  <div class="selected-schedule">
    {#key $selectedUser}
      <p>Schedule for: {getUserName($selectedUser)}</p>
    {/key}
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
