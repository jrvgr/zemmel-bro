<script lang="ts">
  import { getAppointments } from "@/components/setAppointments";
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Search,
  } from "lucide-svelte";
  import { active } from "tinro";
  import {
    currentWeek,
    weekOffset,
    appointments,
    selectedUser,
  } from "@/stores";
  import { showScheduleSelector } from "@/components/global-nav/stores";
  import { onMount } from "svelte/internal";
  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { onDestroy } from "svelte/internal";
  dayjs.extend(advancedFormat);

  const increment = (): void => {
    weekOffset.update((week) => week + 1);
  };

  const decrement = (): void => {
    weekOffset.update((week) => week - 1);
  };

  const reset = (): void => {
    weekOffset.set(0);
  };

  const refresh = (): void => {
    getAppointments($currentWeek, appointments, $selectedUser);
  };

  let unsubscribe: Function = () => {};

  onMount(() => {
    unsubscribe = weekOffset.subscribe((week) => {
      currentWeek.set(dayjs().add(week, "w"));
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<nav>
  <button
    class="normal-button"
    on:click={() => showScheduleSelector.set(!$showScheduleSelector)}
  >
    <Search />
  </button>
  <button class="normal-button" on:click={decrement}>
    <ChevronLeft />
  </button>
  <button class="normal-button" on:click={reset}>
    <Calendar />
  </button>
  <button class="normal-button" on:click={increment}>
    <ChevronRight />
  </button>
  <button class="normal-button" on:click={refresh}>
    <RefreshCw />
  </button>

  <slot />
</nav>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    align-items: center;
    height: min-content;
    justify-content: space-evenly;
    padding: 0 0.4rem;
  }
  .normal-button {
    // background-color: var(--header-background);
    width: 100%;
  }
</style>
