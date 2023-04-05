<script>
  import { events } from "../../store/eventStore";
  import {
    modalOpen,
    modalTitle,
    modalAction,
    modalDate,
    modalItemId,
    modalItemType,
  } from "../../store/modalStore";

  export let day;
  export let index;
  export let currentDay;

  /**
   * Handle Add Event Click
   *
   * @description Process the add event click
   *
   * @function handleAddEventClick
   * @param {String} title title to use for modal
   * @param {String} action set modal action
   * @param {String} date date string for planner day
   */
  const handleAddEventClick = (title, action, date) => {
    $modalTitle = title;
    $modalAction = action;
    $modalDate = date;
    $modalOpen = !$modalOpen;
  };

  const handleEditEventClick = (id) => {
    $modalTitle = "Edit Event";
    $modalAction = "editEvent";
    $modalItemType = "event";
    $modalItemId = id;
    $modalOpen = !$modalOpen;
  };

  const handleDeleteEventClick = (id) => {
    $modalTitle = "Delete Event";
    $modalAction = "deleteEvent";
    $modalItemType = "event";
    $modalItemId = id;
    $modalOpen = !$modalOpen;
  };
</script>

<div class="mx-auto flex w-11/12 flex-row">
  <div
    class="flex w-full flex-row rounded-lg border border-neutral-400 drop-shadow-lg {day.date ==
    currentDay
      ? 'bg-green-300'
      : 'bg-white'}"
  >
    <div class="w-2/12 border-r border-neutral-400">
      <div class="flex flex-col">
        <div class="pt-3 text-center text-sm font-bold">
          {day.month.slice(0, 3)}
          {day.year}
        </div>
        <div
          class="p-2 pt-1 text-4xl font-bold md:text-center md:text-7xl {index ==
          0
            ? 'text-red-600'
            : 'text-neutral-800'}"
        >
          {day.date.split("-")[2]}
        </div>
      </div>
    </div>
    <div class="flex w-9/12 flex-col">
      <div class="m-2 pt-2 text-2xl font-bold md:text-5xl">
        {day.name}
      </div>
      {#if $events.find((e) => e.startDate === day.date)}
        <div class="font-Handwriting m-2 w-11/12 pt-2 text-xl">
          {#each $events.filter((e) => e.startDate === day.date) as event (event.id)}
            <div class="border-b border-rose-400 pt-2">
              <div class="flex flex-row items-center">
                <div class="pr-1 md:pr-3">
                  <button
                    on:click={handleEditEventClick(event.id)}
                    class="rounded-lg p-1 hover:bg-green-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="h-5 w-5 fill-white stroke-green-500 stroke-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
                <div class="pr-1 md:pr-3">
                  <button
                    on:click={handleDeleteEventClick(event.id)}
                    class="rounded-lg p-1 hover:bg-rose-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="h-6-5 w-5 fill-white stroke-rose-500 stroke-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                <div>{event.title}</div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div
          class="font-Handwriting m-2 w-11/12 border-b border-rose-400 pt-2 text-xl"
        >
          nothing scheduled
        </div>
      {/if}
    </div>
    <div class="flex w-1/12 flex-col items-center border-l border-neutral-400">
      <div class="my-auto p-2">
        <button
          on:click={() =>
            handleAddEventClick("Add Event", "addEvent", day.date)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="h-6 w-6 fill-green-500 hover:fill-green-700 md:h-8 md:w-8"
            ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            /></svg
          >
        </button>
      </div>
    </div>
  </div>
</div>
