<script lang="ts">
  export let appointment;
  import Right from "./right/index.svelte";
  import Left from "./left/index.svelte";
  import { slide } from "svelte/transition";
</script>

<div class="appointment grouped" in:slide={{ duration: 1000 }}>
  <Left {appointment} />
  <Right {appointment} />
</div>

<style lang="scss">
  .grouped {
    border-left: var(--accent-gray) solid 5px;
    position: relative;
    transition: all 0.5s;
    transform-origin: right;
    &:hover {
      border-left: var(--accent-gray) solid 100px;
      :global(.left::before) {
        transform: scale(1);
        transition: all 0.3s;
      }
    }
  }
  .appointment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--popup_item-background);
    border-radius: 5px;
    color: var(--button-foreground);
    height: min-content;
    margin: 0 0.625em;
    padding: 0.625em;
    flex-wrap: wrap-reverse;
    align-items: flex-end;
    gap: 10px;
    :global(p) {
      margin: 0;
    }
    :global(.cancelled) {
      background-color: var(--accent-red-lighter);
      color: #fff;
    }
  }
</style>
