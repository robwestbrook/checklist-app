<script>
  import PlannerEvent from "./PlannerEvent.svelte";
  import { events } from "../../store/eventStore";
  import { addEventDate } from "../../store/eventDateStore";
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

  /**
   * Handle Edit Event Click
   *
   * @description Takes in the event ID and sets the modal
   * stores values
   *
   * @function handleEditEventClick
   * @param {String} id event ID
   */
  const handleEditEventClick = (id) => {
    $modalTitle = "Edit Event";
    $modalAction = "editEvent";
    $modalItemType = "event";
    $modalItemId = id;
    $modalOpen = !$modalOpen;
  };

  /**
   * Handle Delete Event Click
   *
   * @description Takes in the event ID and sets the
   * modal stores values
   *
   * @function handleDeleteEventClick
   * @param {String} id event ID
   */
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
    class="my-2 flex w-full flex-row rounded-lg border border-neutral-400 drop-shadow-lg {day.date ==
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
            <PlannerEvent {event} />
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
        <a href="/events/add-event">
          <button on:click={() => ($addEventDate = day.date)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="h-6 w-6 fill-green-500 hover:fill-green-700 md:h-8 md:w-8"
              ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              /></svg
            >
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
