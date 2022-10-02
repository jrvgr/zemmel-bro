<script lang="ts">
  export let appointment;
  import dayjs from "dayjs";

  console.log(appointment);
</script>

<p>
  {dayjs(appointment.start * 1000).format("HH:mm")} - {dayjs(
    appointment.end * 1000
  ).format("HH:mm")}
</p>
