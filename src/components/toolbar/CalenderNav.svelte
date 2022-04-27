<script lang="ts">
  import { getAppointments } from "@/components/setAppointments";
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    List,
    MoveHorizontal,
    MoveVertical,
    RefreshCw,
  } from "lucide-svelte";
  import { active } from "tinro";
  import { currentWeek, week, appointments, selectedUser } from "@/stores";
  import { onMount } from "svelte/internal";
  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { onDestroy } from "svelte/internal";
  dayjs.extend(advancedFormat);

  const increment = (): void => {
    week.update((week) => week + 1);
  };

  const decrement = (): void => {
    week.update((week) => week - 1);
  };

  const reset = (): void => {
    week.set(0);
  };

  const refresh = (): void => {
    getAppointments($currentWeek, appointments, $selectedUser);
  };

  let unsubscribe: Function = () => {};

  onMount(() => {
    unsubscribe = week.subscribe((week) => {
      currentWeek.set(dayjs().add(week, "w"));
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<nav>
  <div class="pages">
    <a
      class="normal-button"
      href="/main/calendar/list"
      use:active
      active-class="active"><List /></a
    >
    <a
      class="normal-button"
      href="/main/calendar/horizontal"
      use:active
      active-class="active"><MoveHorizontal /></a
    >
    <a
      class="normal-button"
      href="/main/calendar/vertical"
      use:active
      active-class="active"><MoveVertical /></a
    >
  </div>
  <div class="seperator" />
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

  <slot />
</nav>

<style lang="scss">
  nav,
  nav .pages {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    height: min-content;
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
    width: max-content;
    height: max-content;
    border-radius: 0.25em;
    color: var(--button-foreground);
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
