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
