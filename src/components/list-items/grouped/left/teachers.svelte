<script lang="ts">
  export let appointment;
  import Appointment from "@/components/Appointment.svelte";
</script>

<div class="teachers">
  {#each appointment as appointment}
    <Appointment {appointment} fieldname="teachers" />
  {/each}
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
