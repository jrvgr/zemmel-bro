<script lang="ts">
  import { selectedDay } from "@/stores";
  import dayjs from "dayjs";

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
</script>

<div class="weekdays">
  {#each days as day}
    <button
      class:activeDay={$selectedDay.format("dddd") === day}
      class="normal-button"
      on:click={() => selectedDay.set(dayjs().day(days.indexOf(day)))}
    >
      <span>{day.substring(0, 1)}</span>
    </button>
  {/each}
</div>

<style lang="scss">
  .weekdays {
    display: flex;
    gap: 0.3rem;
  }
  .normal-button {
    display: flex;
    gap: 0.5em;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: var(--button-background);
    padding: 0.5rem;
    height: 3em;
    width: 2.7em;
    border-radius: 0.25em;
    color: var(--button-foreground);
  }
  .activeDay {
    background-color: var(--accent-red);
    color: #fff;
  }
</style>
