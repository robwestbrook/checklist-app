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
  import { events } from "../../store/eventStore";

  import { showToast, toastType, toastMessage } from "../../store/toastStore";

  let loaded = false;
  let event;

  // On component mount, get the event from storage
  onMount(() => {
    event = $events.filter((e) => e.id === $modalItemId);
    loaded = true;
  });

  /**
   * Handle Form Submit
   *
   * @description Processes the Edit Event Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the eventStore's editEvent
   * method, passing in the form data object.
   *
   * @function handleSubmit
   * @param {Object} e Event Object
   */
  const handleSubmit = (e) => {
    $modalAction = "";
    $modalTitle = "";
    $modalItemType = "";
    $modalOpen = !$modalOpen;
    const formData = new FormData(e.target);
    let data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    e.target.reset();
    events.editEvent($modalItemId, data);
    $modalItemId = "";

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.title} updated`;
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__title">Title</label
        >
        <input
          type="text"
          name="title"
          bind:value={event[0].title}
          id="add-event-form__title"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
          placeholder="event title"
        />
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__description">Details</label
        >
        <textarea
          name="description"
          id="add-event-form__description"
          bind:value={event[0].description}
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
        />
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__allday">All Day Event?</label
        >
        <select
          name="allDay"
          bind:value={event[0].allDay}
          id="add-event-form__allday"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
        >
          <option>- all day event? -</option>
          <option value="1">yes</option>
          <option value="0">no</option>
        </select>
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__multiday">Multi-Day Event?</label
        >
        <select
          name="multiDay"
          bind:value={event[0].multiDay}
          id="add-event-form__multiday"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
        >
          <option>- multi-day event? -</option>
          <option value="1">yes</option>
          <option value="0">no</option>
        </select>
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__start-date">Start Date</label
        >
        <input
          type="date"
          name="startDate"
          bind:value={event[0].startDate}
          id="add-event-form__start-date"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
          placeholder="start date"
        />
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__start-time">Start Time</label
        >
        <input
          type="time"
          name="startTime"
          bind:value={event[0].startTime}
          id="add-event-form__start-time"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
          placeholder="start time"
        />
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__end-date">End Date</label
        >
        <input
          type="date"
          name="endDate"
          bind:value={event[0].endDate}
          id="add-event-form__end-date"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
          placeholder="end date"
        />
      </div>
      <div class="my-2 flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__start-date">End Time</label
        >
        <input
          type="time"
          name="endTime"
          bind:value={event[0].endTime}
          id="add-event-form__end-time"
          class="w-3/4 rounded-lg text-sm placeholder:text-sm md:w-2/3 md:text-base"
          placeholder="end time"
        />
      </div>
      <div class="flex flex-row items-center justify-center">
        <input
          type="submit"
          class="rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
          value="edit event"
        />
      </div>
    </form>
  </div>
{:else}
  Loading...
{/if}
