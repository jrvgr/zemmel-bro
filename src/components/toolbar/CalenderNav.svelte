<script lang="ts">
  import { showScheduleSelector } from "@/components/global-nav/stores";
  import { getAppointments } from "@/components/setAppointments";
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Search,
  } from "lucide-svelte";
  import {
    currentWeek,
    weekOffset,
    appointments,
    selectedUser,
  } from "@/stores";
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
  <div class="seperator" />
  <button
    class="normal-button"
    on:click={() => showScheduleSelector.set(!$showScheduleSelector)}
  >
    <Search />
  </button>

  <slot />
</nav>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    height: min-content;
  }
  .seperator {
    width: 0;
    height: 2rem;
    border-right: 0.1rem solid var(--popup_item-background);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>
