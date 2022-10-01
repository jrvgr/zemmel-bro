<script lang="ts">
  export let appointment;
  import dayjs from "dayjs";

  export let grouped = false;
</script>

<p>
  {#if grouped}
    {dayjs(appointment[0].start * 1000).format("HH:mm")} - {dayjs(
      appointment[0].end * 1000
    ).format("HH:mm")}
  {:else}
    {dayjs(appointment.start * 1000).format("HH:mm")} - {dayjs(
      appointment.end * 1000
    ).format("HH:mm")}
  {/if}
</p>
