<script lang="ts">
  export let appointment;
  import dayjs from "dayjs";
</script>

<p>
  {dayjs(appointment[0].start * 1000).format("HH:mm")} - {dayjs(
    appointment[0].end * 1000
  ).format("HH:mm")}
</p>
