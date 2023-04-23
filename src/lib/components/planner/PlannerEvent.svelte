<script>
  import ViewEvent from "../event/ViewEvent.svelte";
  export let event;

  /**
   * Handle View Event Click
   *
   * @description Takes in the event ID and creates a
   * string to reference the event's view element.
   * Querys that reference, and sets the element as
   * either hidden or block for viewing. The view is
   * composed with the ViewEvent component.
   *
   * @function handleViewEventClick
   * @param {String} id
   */
  const handleViewEventClick = (id) => {
    let element = `#view-${id}`;
    let viewElement = document.querySelector(element);
    if (viewElement.classList.contains("hidden")) {
      viewElement.classList.remove("hidden");
      viewElement.classList.add("block");
    } else {
      viewElement.classList.remove("block");
      viewElement.classList.add("hidden");
    }
  };
</script>

<div class="border-b border-rose-400 pt-2">
  <div class="flex flex-row items-center">
    <div class="pr-1 md:pr-3">
      <button
        on:click={() => handleViewEventClick(event.id)}
        class="rounded-lg p-1 hover:bg-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-5 w-5 fill-white stroke-blue-600 stroke-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
    <div class="pr-1 md:pr-3">
      <a href="/events/edit-event/{event.id}">
        <button class="rounded-lg p-1 hover:bg-green-300">
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
      </a>
    </div>
    <div class="pr-1 md:pr-3">
      <a href="/events/delete-event/{event.id}">
        <button class="rounded-lg p-1 hover:bg-rose-300">
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
      </a>
    </div>
    <div>{event.title}</div>
  </div>
</div>
<div id={`view-${event.id}`} class="hidden">
  <ViewEvent {event} />
</div>
