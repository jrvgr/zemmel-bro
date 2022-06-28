<script lang="ts">
  import { selectedUser, currentWeek, appointments } from "@/stores";
  import { showYearSelector } from "./stores";
  import {
    allSchoolYears,
    getStudents,
    getTeachers,
    studentSchoolYears,
  } from "@/api";
  import { sameWidth } from "@/components/poppersamewidth";
  import { selectedYear } from "./stores";

  import { onMount } from "svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { slide } from "svelte/transition";
  import YearSelector from "@/components/global-nav/YearSelector.svelte";
  import dayjs from "dayjs";
  import { ChevronDown, Calendar, User } from "lucide-svelte";
  import { getUserName } from "@/components/users";
  import { router } from "tinro";
import { getAppointments } from "@/components/setAppointments";

  //popper instance for year selector
  const yearOptions = {
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }, sameWidth],
  };

  const [yearRef, yearContent] = createPopperActions(yearOptions);

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

  $: getPeopleForYear($selectedYear);

  //data
  let schoolYears = [];

  let students = [];
  let teachers = [];

  async function getPeopleForYear(year) {
    if (year) {
      students = (await getStudents(year.id)).data.response.data;
      teachers = (await getTeachers(year.id)).data.response.data.map(
        (teacher) => ({ ...teacher, isEmployee: true })
      );
    }
  }

  function clickhandler(person) {
    selectedUser.set(person);
    router.goto("/main/calendar");
    getAppointments($currentWeek, appointments, $selectedUser)
  }

  $: console.log(students);
</script>

<header
  style="display: flex; flex-direction: row; background-color: var(--popup_item-background); gap: 0.5em; padding: 0.3em; display: flex; overflow-y: visible; "
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
</header>

<section class="people" style="padding:10px; display: flex;">
  <div
    class="students"
    style="display: flex; flex-direction: column; gap:3px; background-color: var(--popup_item-background); gap: 0.5em; padding: 10px; display: flex; overflow-y: visible; border-radius: 5px; text-align: center;"
  >
    <h1>Students</h1>
    {#each students as student}
      <div
        class="student"
        style="background-color: var(--header-background); border-radius: 5px; padding: 5px; display: flex; justify-content: space-between; align-items: center;"
      >
        <div class="info" style="display: flex; gap: 5px; align-items: center;">
          <User />
          <p style="margin: 0">{getUserName(student)}</p>
        </div>
        <button class="normal-button" on:click={() => clickhandler(student)}
          ><Calendar />
        </button>
      </div>
    {/each}
  </div>
  <div
    class="teachers"
    style="display: flex; flex-direction: column; gap:3px; background-color: var(--popup_item-background); gap: 0.5em; padding: 10px; display: flex; overflow-y: visible; border-radius: 5px; text-align: center;"
  >
    <h1>Teachers</h1>
    {#each teachers as teacher}
      <div
        class="student"
        style="background-color: var(--header-background); border-radius: 5px; padding: 5px; display: flex; justify-content: space-between; align-items: center; "
      >
        <div class="info" style="display: flex; gap: 5px; align-items: center;">
          <User />
          <p style="margin: 0">{getUserName(teacher)}</p>
        </div>
        <button class="normal-button" on:click={() => clickhandler(teacher)}
          ><Calendar />
        </button>
      </div>
    {/each}
  </div>
</section>

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

  .people {
    flex-direction: row;
    gap: 10px;
    & > * {
      width: 100%;
      color: var(--button-foreground);
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      & > * {
        width: initial;
      }
    }
  }
</style>
