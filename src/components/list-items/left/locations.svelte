<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";

  export let grouped = false;
</script>

<div class="locations">
  {#if grouped}
    {#each appointment as appointment}
      <Appointment {appointment} fieldname="locations" />
    {/each}
  {:else if appointment.locations.length > 0}
    <Appointment {appointment} fieldname="locations" />
  {/if}
</div>

<style lang="scss">
  .locations {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-red);
    flex-wrap: wrap;
    :global(p) {
      color: #fff;
    }
    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
</style>
