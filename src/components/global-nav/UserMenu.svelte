<script lang="ts">
  import Switch from "svelte-switch";
  import { Darkmode } from "@/main";
  import { logout } from "@/api";
  import { LogOut } from "lucide-svelte";

  let checkedValue = false;

  const dark = localStorage.getItem("dark");
  if (dark === "true") {
    checkedValue = true;
  }
</script>

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

<style lang="scss">
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
</style>
