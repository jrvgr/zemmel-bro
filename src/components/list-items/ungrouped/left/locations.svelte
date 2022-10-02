<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";
</script>

<div class="locations">
  {#if appointment.locations.length > 0}
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
