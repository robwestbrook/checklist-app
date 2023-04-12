<script>
  import dayjs from "dayjs";
  import isBetween from "dayjs/plugin/isBetween";

  dayjs.extend(isBetween);

  import { events } from "../../store/eventStore";
  import { getToday, getFutureDate } from "../../library/event";

  import EventTableBody from "./EventTableBody.svelte";

  let interval = 30;
  let viewEvents = true;
  let today = getToday();

  /**
   * Reactive properties
   *
   * intervalString = convert select box value to string
   * futureDate = get the future date based on interval
   * getEvents = gets an array of events between today and future date
   * intervalEvents = sort interval events by start date
   */
  $: intervalString = interval.toString();
  $: futureDate = getFutureDate(interval);
  $: getEvents = $events.filter((e) =>
    dayjs(e.startDate).isBetween(dayjs(today).subtract(1, "day"), futureDate)
  );
  $: intervalEvents = getEvents.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const handleEventView = (e) => {
    let days = e.target.value;
    interval = parseInt(days);
  };

  const eventsOpen = () => {
    viewEvents = !viewEvents;
  };
</script>

<div>
  <div
    class="container mx-auto rounded-b-md border-x-4 border-b-4 border-slate-600 bg-white py-3"
  >
    <div class="mb-3 ml-2">
      <button
        on:click={() => eventsOpen()}
        class="flex flex-row items-center justify-center rounded-lg border-2 border-slate-700 bg-white px-4 py-1 text-xs font-semibold text-black drop-shadow-lg hover:bg-black hover:text-white"
      >
        <span class="mr-2">
          {#if !viewEvents}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="hover:stoke-white h-4 w-4 fill-black stroke-black stroke-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-4 w-4 stroke-white stroke-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          {/if}
        </span>

        <span>
          {viewEvents ? "Hide" : "View"} Events
        </span>
      </button>
    </div>
    <div class={viewEvents ? "block" : "hidden"}>
      <div class="flex w-11/12 flex-row items-center justify-around">
        <div>
          <h2 class="px-5 text-lg font-bold md:text-2xl">Upcoming Events</h2>
        </div>
        <div>
          <select
            class="rounded-lg border-black bg-slate-100 text-xs text-black placeholder-black ring-2 ring-black focus:ring-2 focus:ring-black md:text-lg"
            name="eventView"
            bind:value={intervalString}
            on:change={handleEventView}
          >
            <option>- Change Events View -</option>
            <option value="7">next 7 days</option>
            <option value="30">next 30 days</option>
            <option value="60">next 60 days</option>
            <option value="90">next 90 days</option>
            <option value="120">next 120 days</option>
            <option value="180">next 180 days</option>
            <option value="9999">all events</option>
          </select>
        </div>
      </div>
      <table
        class="mx-auto my-3 w-11/12 border-separate border-spacing-2 rounded-lg border border-slate-300 bg-slate-100"
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {#each intervalEvents as event}
            <EventTableBody {event} />
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
