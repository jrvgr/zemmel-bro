<script lang="ts">
  import UserMenu from "./UserMenu.svelte";
  import ScheduleSelector from "./ScheduleSelector.svelte";
  import { ChevronDown, Calendar, Users } from "lucide-svelte";
  import { Route, active } from "tinro";
  import { getUserName } from "../users";
  import { getUserInfo } from "@/api";
  import Transition from "../NavTransition.svelte";
  import { onMount } from "svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { sameWidth } from "../poppersamewidth";
  import { slide } from "svelte/transition";
  import MediaQuery from "svelte-media-query";

  //import pages
  import { showScheduleSelector } from "./stores";
  import CalenderNav from "../toolbar/CalenderNav.svelte";

  let studentname = "";

  onMount(async () => {
    studentname = getUserName((await getUserInfo("~me")).data.response.data[0]);
  });

  let showUserMenu = false;

  //initialize popper instances
  const popperOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }, sameWidth],
  };

  export const [userRef, userContent] = createPopperActions(popperOptions);

  const selectorOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }, sameWidth],
  };

  const [selectorContent] = createPopperActions(selectorOptions);
</script>

<nav>
  <div class="left">
    <button
      use:userRef
      on:click={() => (showUserMenu = !showUserMenu)}
      id="reference"
      class="user"
    >
      <span class="username">{studentname}</span>
      <div class="chevronDown" class:rotate={showUserMenu}>
        <ChevronDown />
      </div>
    </button>
    <div class="seperator" />
    <a href="/main/calendar/*" use:active active-class="active"><Calendar /></a>
    <a href="/main/people" use:active active-class="active"><Users /></a>
  </div>
  <MediaQuery query="(min-width: 801px)" let:matches>
    {#if matches}
      <div class="toolbar">
        <Transition>
          <Route path="/calendar/list"><CalenderNav /></Route>
        </Transition>
      </div>
    {/if}
  </MediaQuery>
</nav>

{#if showUserMenu}
  <div id="tooltip popper" transition:slide use:userContent class="user-menu">
    <UserMenu />
  </div>
{/if}

{#if $showScheduleSelector}
  <div
    use:selectorContent
    transition:slide
    style="display: flex;flex-direction: row; background-color: var(--popup_item-background); gap: 0.5em; padding: 0.3em; display: flex; overflow-y: visible;"
  >
    <ScheduleSelector />
  </div>
{/if}

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: var(--header-background);
    color: var(--header-background-darker);
    font-size: 1.2rem;
    font-weight: bold;
    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.5rem;
        background: var(--header-background);
        color: var(--button-foreground);
        font-size: 1.1rem;
        font-weight: bold;
        border: none;
        gap: 0.2rem;
        border-radius: 0.3rem;
        cursor: pointer;

        &:hover {
          background-color: var(--button-background);
        }
      }
      a {
        transition: 0.2s ease all;
        color: var(--button-foreground);
        text-decoration: none;
        padding: 0.5rem;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        border-radius: 0.3rem;
        &:hover {
          background-color: var(--button-background);
        }
      }
    }
  }

  .chevronDown {
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .seperator {
    width: 0;
    height: 2rem;
    border-right: 0.1rem solid var(--popup_item-background);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-left: 0.5rem;
  }

  .user-menu {
    display: flex;
    flex-direction: column;
    border-radius: 0.3rem;
    background-color: var(--button-background);
    min-width: max-content
  }
</style>
