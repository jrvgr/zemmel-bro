<script lang="ts">
  export let appointment;
  import Locations from "./locations.svelte";
  import Subjects from "./subjects.svelte";
  import Teachers from "./teachers.svelte";

  export let grouped = false;
</script>

<div class="left" class:grouped>
  <div class="top">
    <Subjects {appointment} {grouped} />
  </div>
  <div class="bottom">
    <Locations {appointment} {grouped} />
    <Teachers {appointment} {grouped} />
  </div>
</div>

<style lang="scss">
  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;
    flex: 1 1 50%;
    flex-wrap: wrap;
    overflow: visible;
    .top {
      font-size: larger;
      display: flex;
      flex-wrap: wrap;
    }
    .bottom {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 0.5rem;
      font-size: 14px;
      width: inherit;
      flex-wrap: wrap;
    }
  }

  .grouped::before {
    content: "Grouped";
    display: block;
    position: absolute;
    // left: -82.5px;
    right: calc(100% + 15px);
    top: 37.5%;
    font-size: large;
    z-index: 10;
    transition: all 0.25s;
    transform: scale(0);
    transform-origin: center;
  }
</style>
