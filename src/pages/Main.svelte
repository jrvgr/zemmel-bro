<script lang="ts">
  import { Route } from "tinro";

  //navigation
  import Nav from "@/components/global-nav/GlobalNav.svelte";

  //pages
  import List from "@/pages/subpages/calendar/List.svelte";
  import Horizontal from "@/pages/subpages/calendar/Horizontal.svelte";
  import Vertical from "@/pages/subpages/calendar/Vertical.svelte";
  import People from "@/pages/subpages/People.svelte";

  //animation
  import Transition from "@/components/PageTransition.svelte";
  import { getAppointments } from "@/components/setAppointments";
  import { setSelectedStudentDefault } from "@/components/users";
  import { appointments, currentWeek, selectedUser } from "@/stores";
  setSelectedStudentDefault();

  $: if ($selectedUser !== { code: "~me" })
    getAppointments($currentWeek, appointments, $selectedUser);
</script>

<Nav />

<Transition>
  <Route path="/calendar" redirect="calendar/list" />
  <Route path="/calendar/list"><List /></Route>
  <Route path="/calendar/horizontal"><Horizontal /></Route>
  <Route path="/calendar/vertical"><Vertical /></Route>
  <Route path="/people"><People /></Route>
</Transition>
