<script>
  import Toast from "$lib/components/nav/Toast.svelte";
  // Import Event Store
  import { events } from "$lib/store/eventStore";
  import { addEventDate } from "$lib/store/eventDateStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

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
    const formData = new FormData(e.target);
    let data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    e.target.reset();
    events.addEvent(data);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.title} added`;
  };
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      Add Event
    </div>
    <div class="mx-auto my-3 w-11/12">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__title">Title</label
          >
          <input
            type="text"
            name="title"
            id="add-event-form__title"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
            placeholder="event title"
          />
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__description">Details</label
          >
          <textarea
            name="description"
            id="add-event-form__description"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
          />
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__allday">All Day Event?</label
          >
          <select
            name="allDay"
            id="add-event-form__allday"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
          >
            <option>- all day event? -</option>
            <option value="1">yes</option>
            <option value="0">no</option>
          </select>
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__start-date">Start Date</label
          >
          <input
            type="date"
            name="startDate"
            value={$addEventDate !== "" ? $addEventDate : null}
            id="add-event-form__start-date"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
            placeholder="start date"
          />
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__start-time">Start Time</label
          >
          <input
            type="time"
            name="startTime"
            id="add-event-form__start-time"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
            placeholder="start time"
          />
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__end-date">End Date</label
          >
          <input
            type="date"
            name="endDate"
            id="add-event-form__end-date"
            class="w-2/3 rounded-lg text-sm md:w-3/4 md:text-base"
            placeholder="end date"
          />
        </div>
        <div class="my-3 flex flex-row items-center">
          <label
            class="w-1/3 pr-5 text-right text-sm font-bold md:w-1/4 md:text-base"
            for="add-event-form__start-date">End Time</label
          >
          <input
            type="time"
            name="endTime"
            id="add-event-form__end-time"
            class="w-2/3 rounded-lg text-sm placeholder:text-sm md:w-3/4 md:text-base"
            placeholder="end time"
          />
        </div>
        <div class="flex flex-row items-center justify-center">
          <input
            type="submit"
            class="my-3 rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white drop-shadow-lg hover:bg-fuchsia-500"
            value="add event"
          />
          <a href="/">
            <button
              class="mx-3 my-3 rounded-lg border border-rose-700 bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-400"
              >cancel</button
            >
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

<Toast />
