<script lang="ts">
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    List,
    MoveHorizontal,
    MoveVertical,
  } from "lucide-svelte";
  import { Route, active } from "tinro";
  import { week } from "@/stores";

  function increment() {
    week.update((week) => week + 1);
  }

  function decrement() {
    week.update((week) => week - 1);
  }

  function reset() {
    week.set(0);
  };


</script>

<nav>
  <div class="pages">
    <a href="/main/calendar/list" use:active active-class="active"><List /></a>
    <a href="/main/calendar/horizontal" use:active active-class="active"
      ><MoveHorizontal /></a
    >
    <a href="/main/calendar/vertical" use:active active-class="active"
      ><MoveVertical /></a
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
  }
  a {
    display: flex;    gap: 0.5em;

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
