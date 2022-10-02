<script lang="ts">
  import Times from "./times.svelte";
  import TimeSlot from "./timeSlot.svelte";
  export let appointment;
</script>

<div class="right">
  <div class="top">
    <Times {appointment} />
  </div>
  <div class="bottom">
    <TimeSlot {appointment} />
  </div>
</div>

<style lang="scss">
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: max-content;
    gap: 0.5em;
    .top {
      display: flex;
      font-size: larger;
      align-items: center;
      width: max-content;
    }
    .bottom {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.875em;
      flex-grow: 1;
      flex-basis: 0;
      align-content: space-around;
    }
  }
</style>
