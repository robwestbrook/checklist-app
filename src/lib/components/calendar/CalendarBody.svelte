<script>
  import { createEventDispatcher } from "svelte";
  import { dayString, isItToday } from "../../library/calendar";

  import { events } from "../../store/eventStore";

  export let i;
  export let calendar;
  export let today;

  const dispatch = createEventDispatcher();
</script>

{#if i < calendar.paddingDays}
  <div class="bg-white" />
{:else if i > calendar.paddingDays}
  {#if isItToday(dayString(i, calendar.year, calendar.month, calendar.paddingDays), today)}
    <div
      on:mouseup={dispatch(
        "goToDay",
        dayString(i, calendar.year, calendar.month, calendar.paddingDays)
      )}
      class="h-8 cursor-pointer bg-green-200 p-1 text-xs text-neutral-800 hover:bg-green-400 hover:transition hover:duration-300 hover:ease-in-out"
    >
      <div class="flex flex-col">
        <div class="w-full text-xs">
          {#if $events.find((e) => e.startDate === dayString(i, calendar.year, calendar.month, calendar.paddingDays))}
            <span class="rounded-full bg-pink-600 p-1 font-bold text-white"
              >{i - calendar.paddingDays}</span
            >
          {:else}
            <span>{i - calendar.paddingDays}</span>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div
      on:mouseup={dispatch(
        "goToDay",
        dayString(i, calendar.year, calendar.month, calendar.paddingDays)
      )}
      class="h-8 cursor-pointer bg-white p-1 text-neutral-800 hover:bg-neutral-200 hover:text-neutral-800 hover:transition hover:duration-300 hover:ease-in-out"
    >
      <div class="flex flex-col">
        <div class="w-full text-xs">
          {#if $events.find((e) => e.startDate === dayString(i, calendar.year, calendar.month, calendar.paddingDays))}
            <span class="rounded-full bg-pink-600 p-1 font-bold text-white"
              >{i - calendar.paddingDays}</span
            >
          {:else}
            <span>{i - calendar.paddingDays}</span>
          {/if}
        </div>
      </div>
    </div>
  {/if}
{/if}
