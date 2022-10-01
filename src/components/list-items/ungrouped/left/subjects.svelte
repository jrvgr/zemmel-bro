<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";
</script>

<div class="subjects">
  {#if appointment.subjects.length > 0}
    <Appointment {appointment} fieldname="subjects" />
  {/if}
</div>

<style lang="scss">
  .subjects {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    :global(p) {
      white-space: pre-wrap;
    }

    :global(*:not(:last-of-type)::after) {
      content: ",";
    }
  }
</style>
