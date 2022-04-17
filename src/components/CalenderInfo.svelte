<script lang="ts">
  import { selectedStudent, week } from "@/stores";
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte/internal";

  let mondaydate;
  let sundaydate;
  let unsubscribe: Function = () => {};

  onMount(() => {
    week.subscribe((week) => {
      mondaydate = dayjs(dayjs().add(week, "w")).day(1).format("MMM DD");
      sundaydate = dayjs(dayjs().add(week, "w")).day(7).format("MMM DD");
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  <div class="week-info">
    <p class="weekstart">week: {mondaydate} till {sundaydate}</p>
  </div>
  <slot />
  <div class="selected-schedule">
    <p>schedule: {$selectedStudent}</p>
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
