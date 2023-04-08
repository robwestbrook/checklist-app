<script>
  // Import Modal Stores
  import {
    modalOpen,
    modalDate,
    modalAction,
    modalTitle,
  } from "../../store/modalStore";

  // Import Event Store
  import { events } from "../../store/eventStore";

  /**
   * Handle Form Submit
   *
   * @description Processes the Add Event Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the eventStore's addEvent
   * method, passing in the form data object.
   *
   * @function handleSubmit
   * @param {Object} e Event Object
   */
  const handleSubmit = (e) => {
    $modalOpen = !$modalOpen;
    $modalDate = "";
    $modalAction = "";
    $modalTitle = "";
    const formData = new FormData(e.target);
    let data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    e.target.reset();
    events.addEvent(data);
  };
</script>

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
        id="add-event-form__start-date"
        value={$modalDate || ""}
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
        id="add-event-form__end-time"
        class="w-3/4 rounded-lg text-sm placeholder:text-sm md:w-2/3 md:text-base"
        placeholder="end time"
      />
    </div>
    <div class="flex flex-row items-center justify-center">
      <input
        type="submit"
        class="rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
        value="add event"
      />
    </div>
  </form>
</div>
