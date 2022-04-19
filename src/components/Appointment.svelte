<script lang="ts">
  export let appointment;
  export let fieldname = "";
  const normalfield = appointment[fieldname];
  // let actionfield = [];
  // appointment.actions.forEach((element) => {
  //   actionfield.push(
  //     element.appointment[fieldname].toString().replace(/,/g, " en ")
  //   );
  // });
</script>

<!-- {#if appointment.actions.length > 0}
  {#if actionfield.length > 0}
    <div class={fieldname}>
      {#each actionfield as output}
        <p>{output}</p>
      {/each}
    </div>
  {/if} -->
{#if normalfield}
  <div class={fieldname}>
    {#each normalfield as output}
      <p>{output}</p>
    {/each}
  </div>
{/if}

<style lang="scss">
  p {
    margin: 0;
  }
  .teachers {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-blue);
    flex-wrap: wrap;
    p {
      color: #fff;
    }
    *:not(:last-of-type)::after {
      content: ",";
    }
  }
  .locations {
    display: flex;
    gap: 0.5em;
    padding: 0.3em;
    border-radius: 5px;
    background-color: var(--accent-red);
    flex-wrap: wrap;
    p {
      color: #fff;
    }
    *:not(:last-of-type)::after {
      content: ",";
    }
  }
  .subjects {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    p {
      white-space: pre-wrap;
    }

    *:not(:last-of-type)::after {
      content: ", ";
    }
  }
</style>
