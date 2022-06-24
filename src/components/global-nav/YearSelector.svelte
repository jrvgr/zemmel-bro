<script lang="ts">
  import { showYearSelector, selectedYear } from "./stores";

  //data management
  export let schoolYears = [];
</script>

{#key schoolYears}
  {#each schoolYears as year}
    <button
      class="normal-button"
      style="z-index:40; background-color: var(--header-background); width: 100%; text-align: center;"
      on:click={() => (selectedYear.set(year), ($showYearSelector = false))}
    >
      {year.year}
    </button>
  {/each}
{/key}
