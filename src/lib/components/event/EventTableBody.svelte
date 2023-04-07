<script>
  import { months } from "../../data/calendarData";

  export let event;
</script>

<tr>
  <td
    class="w-1/4 border-collapse rounded-lg border-2 border-slate-400 bg-white p-2 drop-shadow-md"
  >
    <div class="flex flex-col">
      <div class="text-center text-xs md:text-base">
        {months[event.startDate.split("-")[1] - 1].slice(0, 3)}
        {event.startDate.split("-")[0]}
      </div>
      <div class="text-center text-2xl font-bold md:text-5xl">
        {event.startDate.split("-")[2]}
      </div>
    </div>
  </td>
  <td
    class="w-3/4 border-collapse rounded-lg border-2 border-slate-400 bg-white p-2 text-lg drop-shadow-md md:text-2xl"
    >{event.title}</td
  >
</tr>
