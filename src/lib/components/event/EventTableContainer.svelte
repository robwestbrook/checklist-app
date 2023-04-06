<script>
  import { months } from "../../data/calendarData";
  import { events } from "../../store/eventStore";
  import { getToday, getFutureDate } from "../../library/event";

  import EventTableBody from "./EventTableBody.svelte";

  let interval = 30;
  let today = getToday();

  $: intervalString = interval.toString();
  $: futureDate = getFutureDate(interval);

  const handleEventView = (e) => {
    let days = e.target.value;
    if (days !== "all") {
      interval = parseInt(days);
    } else {
      interval = 9999;
    }
  };
</script>

<div>
  <div
    class="container mx-auto rounded-b-md border-x-4 border-b-4 border-slate-600 bg-white py-3"
  >
    <div class="flex w-11/12 flex-row items-center justify-around">
      <div>
        <h2 class="px-5 text-2xl font-bold">Upcoming Events</h2>
      </div>
      <div>
        <select
          class="rounded-lg border-black bg-slate-100 text-sm text-black placeholder-black ring-2 ring-black focus:ring-2 focus:ring-black md:text-lg"
          name="eventView"
          bind:value={intervalString}
          on:change={handleEventView}
        >
          <option>- Change Events View -</option>
          <option value="30">next 30 days</option>
          <option value="60">next 60 days</option>
          <option value="90">next 90 days</option>
          <option value="120">next 120 days</option>
          <option value="180">next 180 days</option>
          <option value="all">all events</option>
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
        {#each $events as event}
          <EventTableBody {event} {today} {futureDate} />
        {/each}
      </tbody>
    </table>
  </div>
</div>
