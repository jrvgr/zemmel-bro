<script lang="ts">
	import { Router, Link, Route } from "svelte-navigator";
	import Main from "./lib/pages/main.svelte";
	import Login from "./lib/pages/login.svelte";
</script>

<Router>
	<Route path="/" component={Main} />
	<Route path="/login" component={Login} />
</Router>

<style lang="scss">
	:global body {
		--body-background: #fcfffd;
		--header-background: #f5f5f5;
		--button-background: #e9e9e9;
		--button-foreground: #626262;
		--popup_item-background: #e2e2e2;
		--accent-color-gray: #c2c2c2;
		--accent-color-red: #e35858;
		--accent-color-blue: #218ce4;
	}

	:global body.dark {
		--body-background: #373737;
		--header-background: #232323;
		--button-background: #393939;
		--button-foreground: #fafafa;
		--popup_item-background: #484848;
		--accent-color-gray: #676767;
		--accent-color-red: #c62828;
		--accent-color-blue: #1976d2;
	}
</style>
