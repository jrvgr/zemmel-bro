<script lang="ts">
    import { fade } from "svelte/transition";
    import { router } from "tinro"
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot/>
  </div>
{/key}
