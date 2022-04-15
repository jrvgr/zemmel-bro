<script lang="ts">
	import { GraduationCap, Share2 } from "lucide-svelte";
	import { updateToken } from "@/api";
	let school = "";
	let koppelcode = "";

	if (localStorage.getItem('school')) {
		school = localStorage.getItem('school');
	}

	function store(): void {
		koppelcode = koppelcode.replace(/\s/g, "");
		if (koppelcode && school) updateToken(koppelcode, school);
	}
</script>

<main>
	<div class="login">
		<div class="top">
			<h3>Zemmel-bro</h3>
			<p>fill in your school and koppelcode</p>
		</div>
		<div class="bottom">
			<div class="school">
				<input
					class="button school-input"
					type="text"
					name="School"
					placeholder="School"
					bind:value={school}
				/>
				<GraduationCap class="icon" />
			</div>
			<div class="koppelcode">
				<input
					class="button koppelcode-input"
					type="text"
					name="Koppelcode"
					placeholder="Koppelcode"
					bind:value={koppelcode}
				/>
				<Share2 />
			</div>
			<button on:click={store} class="submit button">Submit</button>
		</div>
	</div>
</main>

<style lang="scss">
	* {
		transition: all 0.2s ease;
	}
	main {
		background-color: var(--body-background);
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	:global body {
		margin: 0;
		padding: 0;
	}

	.login {
		width: 250px;
		height: 300px;
		background-color: var(--popup_item-background);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}

	.school,
	.koppelcode {
		margin-bottom: 10px;
		display: flex;
		width: calc(100% - 10px);
		display: flex;
		border: none;
		align-items: center;
		background-color: var(--header-background);
		border-radius: 5px;
		padding: 0 5px;
		transition: all 0.2s;
		:global svg {
			color: var(--accent-gray);
		}

		&:focus-within {
			box-shadow: 0 3px 0 0 var(--header-background-darker);
			transform: translateY(-2px);
		}
	}

	.bottom,
	.top {
		width: 100%;
	}

	.top {
		h3 {
			margin-bottom: 5px;
		}
		p {
			margin-top: 0px;
		}
		text-align: center;
		color: var(--button-foreground);
	}
	.button {
		width: 100%;
		height: 50px;
		border: none;
		background-color: transparent;
		color: var(--button-foreground);
		outline: none;
	}

	.submit {
		background-color: var(--accent-red);
		color: white;
		width: 100%;
		border-radius: 5px;
		transition: all 0.2s;
	}

	.submit:hover {
		box-shadow: 0 5px 0 0 var(--accent-red-darker);
		transform: translateY(-5px);
	}

	.submit:active {
		box-shadow: 0 3px 0 0 var(--accent-red-darker);
		transform: translateY(-2px);
	}
</style>
