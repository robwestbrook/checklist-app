<script>
  import CalendarNav from "./CalendarNav.svelte";
  import CalendarBody from "./CalendarBody.svelte";
  export let calendar;
  export let calendarSize;
  export let today;
</script>

<div
  class="mr-1 mt-4 w-2/3 rounded-sm border border-neutral-500 drop-shadow-lg md:mx-auto md:w-5/12 lg:w-3/12"
>
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
      <CalendarBody {calendar} {i} {today} on:goToDay />
    {/each}
  </div>
</div>
