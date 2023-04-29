<script>
  import { onMount } from "svelte";

  import Toast from "$lib/components/nav/Toast.svelte";
  import Loading from "$lib/components/loading/Loading.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import db from "$lib/data/db";

  import { events } from "$lib/store/eventStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let loading = false;
  let id = parseInt($page.params.id);
  let event;

  onMount(async () => {
    event = await db.events.get(id);
    loading = true;
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
    const formData = new FormData(e.target);
    let data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    events.editEvent(id, data);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.title} updated. Returning...`;

    setTimeout(() => {
      $showToast = false;
      $toastType = "";
      $toastMessage = "";
      goto("/");
    }, 3000);
  };
</script>

{#if loading}
  <div class="container mx-auto my-3 w-full">
    <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
      <div
        class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
      >
        Edit Event
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
              bind:value={event.title}
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
              bind:value={event.description}
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
              bind:value={event.allDay}
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
              bind:value={event.startDate}
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
              bind:value={event.startTime}
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
              bind:value={event.endDate}
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
              bind:value={event.endTime}
              id="add-event-form__end-time"
              class="w-2/3 rounded-lg text-sm placeholder:text-sm md:w-3/4 md:text-base"
              placeholder="end time"
            />
          </div>
          <div class="flex flex-row items-center justify-center">
            <input
              type="submit"
              class="my-3 rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white drop-shadow-lg hover:bg-fuchsia-500"
              value="edit event"
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
{:else}
  <Loading />
{/if}
<Toast />
