<script lang="ts">
  import { Route } from "tinro";

  //navigation
  import Nav from "@/components/global-nav/GlobalNav.svelte";

  //pages
  import List from "@/pages/subpages/List.svelte";
  import People from "@/pages/subpages/People.svelte";

  //animation
  import Transition from "@/components/PageTransition.svelte";
  import { setSelectedStudentDefault } from "@/components/users";
  setSelectedStudentDefault();

</script>

<Nav />

<Transition>
  <Route path="/calendar" redirect="calendar/list" />
  <Route path="/calendar/list"><List /></Route>
  <Route path="/people"><People /></Route>
</Transition>
