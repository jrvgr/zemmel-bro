<script lang="ts">
  import { Route } from "tinro";

  //navigation
  import Nav from "../components/Nav.svelte";
  
  //pages
  import List from "./subpages/calendar/List.svelte";
  import Horizontal from "./subpages/calendar/Horizontal.svelte";
  import Vertical from "./subpages/calendar/Vertical.svelte";
  import People from "./subpages/People.svelte";

  //animation
  import Transition from "../components/Transition.svelte";
</script>

<Nav />

<Transition>
  <Route path="/calendar" redirect="calendar/list"/>
  <Route path="/calendar/list"><List /></Route>
  <Route path="/calendar/horizontal"><Horizontal /></Route>
  <Route path="/calendar/vertical"><Vertical /></Route>
  <Route path="/people"><People /></Route>
</Transition>
