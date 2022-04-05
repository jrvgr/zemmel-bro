<script lang="ts">
  import { ChevronDown, Calendar, Users, LogOut } from "lucide-svelte";
  import { Route, active } from "tinro";
  import { getStudentName } from "./userName";
  import { logout } from "../api";
  import Flex from "svelte-flex";
  import Transition from "./Transition.svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { beforeWrite } from "@popperjs/core/lib/enums";

  let studentname = "";

  getStudentName("~me").then((name) => {
    studentname = name;
  });

  const sameWidth = {
    name: "sameWidth",
    enabled: true,
    phase: beforeWrite,
    requires: ["computeStyles"],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
    },
  };

  const popperOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }, sameWidth],
  };
  const [popperRef, popperContent] = createPopperActions(popperOptions);

  let showUserMenu = false;

  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }

  import List from "./toolbar/List.svelte";
  import Horizontal from "./toolbar/Horizontal.svelte";
  import Vertical from "./toolbar/vertical.svelte";
  import People from "./toolbar/People.svelte";
</script>

<nav>
  <div class="left">
    <button use:popperRef on:click={toggleUserMenu} id="reference" class="user">
      <span class="username">{studentname}</span>
      <div class="chevronDown" class:rotate={showUserMenu}>
        <ChevronDown />
      </div>
    </button>
    <div class="seperator" />
    <a href="/main/calendar/*" use:active active-class="active"><Calendar /></a>
    <a href="/main/people" use:active active-class="active"><Users /></a>
  </div>
  <div class="toolbar">
    <Transition>
      <Route path="/calendar/list"><List /></Route>
      <Route path="/calendar/vertical"><Vertical /></Route>
      <Route path="/calendar/horizontal"><Horizontal /></Route>
      <Route path="/people"><People /></Route>
    </Transition>
  </div>
</nav>

{#if showUserMenu}
  <div id="tooltip popper" class="user-menu">
    <button id="menu-item" use:popperContent on:click={logout}>
      <Flex justify="between">
        <p>Log Out</p>
        <LogOut />
      </Flex>
    </button>
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

  .user-menu {
    button {
      border-radius: 0.3rem;
      cursor: pointer;
      border: none;
      padding: 0 0.2rem;
      color: var(--button-foreground);
    }
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
</style>
