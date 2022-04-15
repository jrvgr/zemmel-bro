<script lang="ts">
  import { ChevronDown, Calendar, Users, LogOut } from "lucide-svelte";
  import { Route, active } from "tinro";
  import { getStudentName } from "./userName";
  import { logout } from "@/api";
  import Transition from "./NavTransition.svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { slide } from "svelte/transition";
  import { sameWidth } from "./poppersamewidth";
  import Switch from "svelte-switch";
  import { Darkmode } from "@/main";

  //import pages
  import List from "./toolbar/List.svelte";
  import Horizontal from "./toolbar/Horizontal.svelte";
  import Vertical from "./toolbar/Vertical.svelte";
  import People from "./toolbar/People.svelte";
  import { onMount } from "svelte";

  let studentname = "";

  onMount(() => {
    getStudentName("~me").then((name) => {
      studentname = name;
    });
  });

  const popperOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }, sameWidth],
  };
  const [popperRef, popperContent] = createPopperActions(popperOptions);

  let showUserMenu = false;

  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }

  let checkedValue = false;

  const dark = localStorage.getItem("dark");
  if (dark === "true") {
    checkedValue = true;
  }
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
  <div id="tooltip popper" transition:slide use:popperContent class="user-menu">
    <div
      id="menu-item"
      on:click={() => (Darkmode(localStorage), (checkedValue = !checkedValue))}
    >
      <p>DarkMode</p>
      <Switch
        checked={checkedValue}
        onColor="#1976d2"
        handleDiameter={14}
        width={40}
        height={20}
        activeBoxShadow="none"
        boxShadow="none"
      >
        <span slot="checkedIcon" />
        <span slot="unCheckedIcon" />
      </Switch>
    </div>
    <button id="menu-item" on:click={logout}>
      <p>Log Out</p>
      <LogOut />
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
    overflow: hidden;
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
    .toolbar {
      overflow: hidden;
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
    display: flex;
    flex-direction: column;
    border-radius: 0.3rem;
    background-color: var(--button-background);
    #menu-item {
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border: none;
      padding: 0.5rem 0.2rem;
      color: var(--button-foreground);
      background-color: transparent;
      p {
        margin: 0;
        font-size: 14px;
      }
      &:hover {
        background-color: var(--popup_item-background);
      }
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
