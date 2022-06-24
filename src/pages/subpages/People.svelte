<script lang="ts">
  import { showYearSelector } from "./stores";
  import { getStudents } from "@/api";
  import { sameWidth } from "@/components/poppersamewidth";

  import { onMount } from "svelte";

  //data

  let students;
  let teachers;
</script>

