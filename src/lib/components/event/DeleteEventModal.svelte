<script>
  import { onMount } from "svelte";

  // Import Modal Stores
  import {
    modalOpen,
    modalAction,
    modalTitle,
    modalItemId,
    modalItemType,
  } from "../../store/modalStore";

  // Import Event Store
  import { events, deleteEvent } from "../../store/eventStore";

  let loaded = false;
  let event;

  onMount(() => {
    event = $events.filter((e) => e.id === $modalItemId);
    loaded = true;
  });

  /**
   * Handle Form Submit
   *
   * @description When the delete button is clicked,
   * clear all modal stores and call deleteEvent
   * method, passing in the event ID
   * @function handleSubmit
   */
  const handleClick = () => {
    $modalAction = "";
    $modalTitle = "";
    $modalItemType = "";
    $modalOpen = !$modalOpen;

    deleteEvent($modalItemId);

    $modalItemId = "";
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <div class="flex flex-col items-center justify-center">
      <div class="m-2 text-center text-xl font-bold">Delete this event?</div>
      <div class="m-2">{event[0].title}</div>
      <div class="m-2">starts {event[0].startDate}</div>
      <div class="m-2">
        <button
          on:click={handleClick}
          class="rounded-lg border border-rose-600 bg-white px-5 py-3 text-rose-600 hover:bg-rose-600 hover:text-white"
          >delete</button
        >
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
