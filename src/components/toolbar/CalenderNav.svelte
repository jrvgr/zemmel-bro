<script lang="ts">
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    List,
    MoveHorizontal,
    MoveVertical,
  } from "lucide-svelte";
  import { active } from "tinro";
  import { currentWeek, week } from "@/stores";
  import { onMount } from "svelte/internal";
  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";
  import { onDestroy } from "svelte/internal";
  import { getStudents, studentSchoolYears } from "@/api";
  import Typeahead from "svelte-typeahead";
  dayjs.extend(advancedFormat);

  function increment() {
    week.update((week) => week + 1);
  }

  function decrement() {
    week.update((week) => week - 1);
  }

  function reset() {
    week.set(0);
  }

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
    overflow: visible;
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
