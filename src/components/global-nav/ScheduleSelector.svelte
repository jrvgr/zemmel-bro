<script lang="ts">
  import { selectedUser, showYearSelector, selectedYear } from "@/stores";
  import { ChevronDown, Building } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import FuzzySearch from "fuzzy-search";
  import { createPopperActions } from "svelte-popperjs";
  import { sameWidth } from "@/components/poppersamewidth";
  import YearSelector from "./YearSelector.svelte";
  import {
    allSchoolYears,
    getStudents,
    getTeachers,
    studentSchoolYears,
  } from "@/api";
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import { getUserName } from "../users";

  //popper instance for year selector
  const yearOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }, sameWidth],
  };

  const [yearRef, yearContent] = createPopperActions(yearOptions);

  //data management
  let data = [];
  let allData = [];
  let results = [];
  let schoolYears = [];

  $: data = [...allData];

  //fuzzy stuff
  $: fuzzy = new FuzzySearch(data, ["firstName", "lastName", "prefix"]);

  let scheduleInput;
  let filteredData = [];

  $: {
    if (filteredData) {
      results = filteredData;
    }
    if (!scheduleInput) {
      results = data;
    }
  }

  async function getPeopleForYear(e) {
    if (e) {
      const students = (await getStudents(e.id)).data.response.data;
      const teachers = (await getTeachers(e.id)).data.response.data.map(
        (teacher) => ({ ...teacher, isEmployee: true })
      );
      data = [...students, ...teachers];
    }
  }

  $: getPeopleForYear($selectedYear);

  $: if (scheduleInput && $selectedYear)
    filteredData = fuzzy.search(scheduleInput);

  onMount(async () => {
    const allYears: Array<Record<string, any> & { id: number }> = (
      await allSchoolYears()
    ).data.response.data;
    const studentYears: number[] = (await studentSchoolYears("~me")).data
      .response.data[0].schoolInSchoolYears;

    schoolYears = allYears
      .filter((year) => studentYears.includes(year.id))
      .sort((a, b) => a.id - b.id) as Array<
      Record<string, any> & { id: number }
    >;

    if (!$selectedYear)
      selectedYear.set(
        schoolYears.filter(
          (year) => year.year === dayjs().subtract(1, "y").year()
        )[0]
      );
  });

  $: console.log(schoolYears);
</script>

<ul
  class="results"
  style="display: flex; overflow-y: visible; overflow-x: scroll; gap: 0.3em; margin: 0; padding: 0; scroll-snap-align: start; scroll-behavior: smooth; padding-bottom: 15px; padding-top: 2px;"
>
  <button
    use:yearRef
    class="normal-button"
    style="display: flex; align-items: center; justify-content: center; background-color: var(--header-background);"
    on:click={() => showYearSelector.set(!$showYearSelector)}
  >
    {#if !$selectedYear}
      Select a year
    {:else}
      {$selectedYear.year}
    {/if}
    <div class="chevronDown" class:rotate={$showYearSelector}>
      <ChevronDown />
    </div>
  </button>

  <input
    placeholder="search for students and teachers"
    type="text"
    class="schedule-input"
    style="background-color: var(--header-background); border: 0; border-radius: 0.3em; padding: 0.3em; color: var(--button-foreground);"
    bind:value={scheduleInput}
  />
  {#each results as result}
    <button
      class="normal-button result"
      style="display: flex; align-items: center; gap: 0.1em; width: 100%; justify-content: center; width: auto; height: auto; no-wrap; padding: 0 0.3em; "
      on:click={() => selectedUser.set(result)}
    >
      <span style="white-space: nowrap; text-indent: 0;">
        {getUserName(result)}
      </span>
      {#if result.isEmployee}
        <Building style="height: 1.3em; width: 1.3em" />
      {/if}
    </button>
  {/each}
</ul>

{#if $showYearSelector}
  <div
    transition:slide
    use:yearContent
    style="min-width:fit-content; display:flex; flex-direction: column; gap: 0.2em; z-index: 40; background: var(--button-background); border-radius: 0.3em;"
  >
    <YearSelector {schoolYears} />
  </div>
{/if}

<style lang="scss">
  .chevronDown {
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }

  .rotate {
    transform: rotate(180deg);
  }
</style>
