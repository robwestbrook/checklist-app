<script>
  // Import components
  import CalendarMonthAndYear from "./CalendarMonthAndYear.svelte";
  import CalendarNav from "./CalendarNav.svelte";
  import CalendarBody from "./CalendarBody.svelte";

  // Receive props from Calendar Container
  export let calendar;
  export let calendarSize;
  export let today;
</script>

<div
  class="container mx-auto mt-4 flex flex-row rounded-t-md border-x-4 border-t-4 border-slate-600 bg-slate-100"
>
  <!--
  Calendar Month and Year Component
  Recieves the props:
    - monthAndYear
-->
  <CalendarMonthAndYear monthAndYear={calendar.calendarMonthAndYear} />
  <div
    class="mr-1 mt-4 w-2/3 rounded-sm border border-neutral-500 drop-shadow-lg md:mx-auto md:w-5/12 lg:w-3/12"
  >
    <!--
  Calendar Nav Component
  Receives the props:
    - calendar
  Dispatches the events:
    - previous
    - next
    - today
-->
    <CalendarNav {calendar} on:previous on:next on:today />
    <div
      class="mx-auto grid w-full grid-cols-7 rounded-b-sm border-x border-b border-neutral-300"
    >
      {#each calendar.weekdays as day}
        <div
          class="font-Condensed bg-fuchsia-700 p-1 text-center text-xs font-bold text-white"
        >
          {day.substring(0, 2)}
        </div>
      {/each}
      {#each calendarSize as day, i}
        <!--
  Calendar Body Component
  Receives the props:
    - calendar
    - i
    - today
  Dispatches the events:
    - goToDay
-->
        <CalendarBody {calendar} {i} {today} on:goToDay />
      {/each}
    </div>
  </div>
</div>
