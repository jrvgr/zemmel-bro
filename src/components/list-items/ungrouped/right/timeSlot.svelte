<script lang="ts">
  import getNumberWithOrdinal from "@/components/getNumberWithOrdinal";
  export let appointment;
</script>

{#if appointment.startTimeSlotName}
  <p class="hour">
    {getNumberWithOrdinal(appointment.startTimeSlotName.replace(/[^0-9]/g, ""))}
    hour
  </p>
{/if}

<style lang="scss">
  .hour {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-green);
    color: #fff;
  }
</style>
