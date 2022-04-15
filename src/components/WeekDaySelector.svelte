<script lang="ts">
  import { selectedDay } from "@/stores";
  import { onDestroy, onMount } from "svelte/internal";

  let day = "monday" as string;
  let unsubscribe: Function = () => {};

  onMount(() => {
    unsubscribe = selectedDay.subscribe((sday) => {
      day = sday as string;
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="weekdays">
  <button
    class:activeDay={$selectedDay === "Monday"}
    class="normal-button monday"
    on:click={() => selectedDay.set("Monday")}
  >
    <span>M</span>
  </button><button
    class:activeDay={$selectedDay === "Tuesday"}
    class="normal-button tuesday"
    on:click={() => selectedDay.set("Tuesday")}
  >
    <span>T</span>
  </button><button
    class:activeDay={$selectedDay === "Wednesday"}
    class="normal-button wednesday"
    on:click={() => selectedDay.set("Wednesday")}
  >
    <span>W</span>
  </button><button
    class:activeDay={$selectedDay === "Thursday"}
    class="normal-button thursday"
    on:click={() => selectedDay.set("Thursday")}
  >
    <span>T</span>
  </button><button
    class:activeDay={$selectedDay === "Friday"}
    class="normal-button friday"
    on:click={() => selectedDay.set("Friday")}
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
    color: #fff
  }
</style>
