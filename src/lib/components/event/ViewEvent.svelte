<script>
  import { months } from "../../data/calendarData";
  export let event;

  /**
   * Convert Time Format
   *
   * @description Takes the storage time and converts
   * it to a more readable format
   * @param {String} t time
   * @returns {String} formatted time string
   */
  const convertTimeFormat = (t) => {
    let splitTime = t.split(":");
    let hours;
    let minutes;
    let amPm;
    if (splitTime[0] > 12) {
      hours = splitTime[0] - 12;
    } else {
      hours = splitTime[0];
    }
    if (splitTime[0] > 11) {
      amPm = "pm";
    } else {
      amPm = "am";
    }
    minutes = splitTime[1];
    return `${hours}:${minutes} ${amPm}`;
  };

  /**
   * Convert Date Format
   *
   * @description Takes the storage date and converts
   * it to a more readable format
   * @param {String} d date
   * @returns {String} formatted date string
   */
  const convertDateFormat = (d) => {
    let splitDate = d.split("-");
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];
    return `${months[parseInt(month - 1)]} ${day}, ${year}`;
  };
</script>

<div
  class="m-1 w-full rounded-lg border-4 border-double border-white bg-fuchsia-700 text-white md:m-3"
>
  <div class="flex flex-col p-1 md:p-3">
    <div class="text-xl font-semibold">{event.title}</div>
    {#if event.description}
      <div class="text-md">{event.description}</div>
    {/if}
    {#if event.startTime}
      <div class="text-sm">starts at {convertTimeFormat(event.startTime)}</div>
    {/if}
    {#if event.endDate && event.endDate !== event.startDate}
      <div class="text-sm">end date: {convertDateFormat(event.endDate)}</div>
    {/if}
    {#if event.endTime}
      <div class="text-sm">ends at {convertTimeFormat(event.endTime)}</div>
    {/if}
  </div>
</div>
