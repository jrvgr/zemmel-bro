<script lang="ts">
  import { Route } from "tinro";
  import Login from "@/pages/Login.svelte";
  import Main from "@/pages/Main.svelte";
</script>

<Route path="/" redirect="/main/calendar"><h1>redirecting</h1></Route>
<Route path="/main/*"><Main /></Route>
<Route path="/login"><Login /></Route>
<Route fallback redirect="/">No page found</Route>