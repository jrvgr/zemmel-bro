<script lang="ts">
  import { selectedDay } from "@/stores";
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte/internal";

  let day = dayjs().day(1);
  let unsubscribe: Function = () => {};

  onMount(() => {
    unsubscribe = selectedDay.subscribe((sday) => {
      day = sday;
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="weekdays">
  <button
    class:activeDay={$selectedDay.format("d") === "1"}
    class="normal-button monday"
    on:click={() => selectedDay.set(dayjs().day(1))}
  >
    <span>M</span>
  </button><button
    class:activeDay={$selectedDay.format("d") === "2"}
    class="normal-button tuesday"
    on:click={() => selectedDay.set(dayjs().day(2))}
  >
    <span>T</span>
  </button><button
    class:activeDay={$selectedDay.format("d") === "3"}
    class="normal-button wednesday"
    on:click={() => selectedDay.set(dayjs().day(3))}
  >
    <span>W</span>
  </button><button
    class:activeDay={$selectedDay.format("d") === "4"}
    class="normal-button thursday"
    on:click={() => selectedDay.set(dayjs().day(4))}
  >
    <span>T</span>
  </button><button
    class:activeDay={$selectedDay.format("d") === "5"}
    class="normal-button friday"
    on:click={() => selectedDay.set(dayjs().day(5))}
  >
    <span>F</span>
  </button>
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
