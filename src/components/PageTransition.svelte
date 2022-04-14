<script lang="ts">
    import { fade } from "svelte/transition";
    import { router } from "tinro"
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot/>
  </div>
{/key}

<style lang="scss">
  div{
    height: 100%;
    width: 100%;
  }
</style>