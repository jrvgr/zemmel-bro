<script lang="ts">
  export let appointment;
  export let fieldname = "";
  let normalfield = appointment[fieldname].toString().replace(/,/g, " and ");
</script>

{#if normalfield}
  <p class:cancelled={appointment.cancelled}>
    {normalfield}
  </p>
{/if}

<style lang="scss">
  p {
    margin: 0;
  }
  .cancelled {
    text-decoration: line-through;
  }
</style>
