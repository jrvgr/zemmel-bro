<script lang="ts">
    import { fly } from "svelte/transition";
    import { router } from "tinro"
</script>

{#key $router.path}
  <div in:fly={{ duration: 400, x: 400 }}>
    <slot />
  </div>
{/key}
