<script>
  import { createEventDispatcher } from "svelte";

  export let calendar;

  const dispatch = createEventDispatcher();
</script>

<div
  class="text-neutral-700 bg-white flex flex-row items-stretch justify-evenly p-1"
>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="fill-cyan-500 h-6 w-6"
      ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
        d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
      /></svg
    >
  </div>
  <div>
    <button
      on:click={() => dispatch("previous")}
      class="text-white bg-fuchsia-700 hover:bg-fuchsia-900 rounded-lg px-2 py-1 hover:transition hover:duration-700 hover:ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="fill-white h-3 w-3"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
        />
      </svg>
    </button>
  </div>
  <div class="font-Condensed text-sm font-bold">
    {calendar.calendarMonthAndYear.substring(0, 3)}
    {calendar.calendarMonthAndYear.substring(
      calendar.calendarMonthAndYear.length - 4
    )}
  </div>
  <div>
    <button
      on:click={() => dispatch("next")}
      class="text-white bg-fuchsia-700 hover:bg-fuchsia-900 rounded-lg px-2 py-1 hover:transition hover:duration-700 hover:ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="fill-white h-3 w-3"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
        />
      </svg>
    </button>
  </div>
  <div>
    <button
      on:click={() => dispatch("today")}
      class="font-Condensed text-white bg-green-500 hover:bg-green-700 rounded-lg px-2 py-1 text-xs font-semibold hover:transition hover:duration-700 hover:ease-in-out"
    >
      today
    </button>
  </div>
</div>
