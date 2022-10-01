<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";

  console.log(appointment)
</script>

<div class="subjects">
  {#each appointment as appointment}
    <Appointment {appointment} fieldname="subjects" />
  {/each}
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
