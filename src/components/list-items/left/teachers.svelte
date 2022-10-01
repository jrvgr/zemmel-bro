<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";

  export let grouped = false;
</script>

<div class="teachers">
  {#if grouped}
    {#each appointment as appointment}
      <Appointment {appointment} fieldname="teachers" />
    {/each}
  {:else if appointment.teachers.length > 0}
    <Appointment {appointment} fieldname="teachers" />
  {/if}
</div>

<style lang="scss">
  .teachers {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-blue);
    width: max-content;
    flex-wrap: wrap;
    width: auto;
    :global(p) {
      color: #fff;
    }
    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
</style>
