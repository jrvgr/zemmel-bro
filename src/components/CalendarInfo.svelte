<script lang="ts">
  import { week } from "@/stores";
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte/internal";

  let mondaydate;
  let sundaydate;
  let unsubscribe: () => {};

  onMount(() => {
    week.subscribe((week) => {
      mondaydate = dayjs(dayjs().add(week, "w")).day(1).format("MMM DD");
      sundaydate = dayjs(dayjs().add(week, "w")).day(7).format("MMM DD");
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  <div class="week-info">
    <p class="weekstart">week: {mondaydate} till {sundaydate}</p>
  </div>
</main>
