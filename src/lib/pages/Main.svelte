<script lang="ts">
	import { Router, Link, Route } from "svelte-navigator";
	import calendar from "./subpages/Calendar.svelte";
	import People from "./subpages/People.svelte";
</script>

<Router>
	<nav>
		<div class="left">
			<Link to="/"></Link>
			<Link to="/people">Login</Link>
		</div>
	</nav>
	<Route path="/calendar" component={calendar} />
	<Route path="/people" component={People} />
</Router>
