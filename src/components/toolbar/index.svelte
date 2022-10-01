<script lang="ts">
  export let matches;
  import Transition from "@/components/NavTransition.svelte";
  import MobileCalenderNav from "./MobileCalendarNav.svelte";
</script>

{#if matches}
  <div class="toolbar">
    <Transition>
      <MobileCalenderNav />
    </Transition>
  </div>
{/if}

<style lang="scss">
  .toolbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 10px 0;
    background: var(--header-background);
  }
</style>
