<script>
  import { onMount } from "svelte";

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
   * @description When the delete button is clicked,
   * clear all modal stores and call deleteEvent
   * method, passing in the event ID
   * @function handleSubmit
   */
  const handleClick = async () => {
    try {
      await events.deleteEvent(id);
      goto("/");
    } catch (err) {
      $showToast = true;
      $toastType = "error";
      $toastMessage = `Error! ${err.message}`;
    }
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
      <div class="mx-auto my-2 w-11/12">
        <div class="flex flex-col items-center justify-center">
          <div class="m-2 text-center text-xl font-bold">
            Delete this event?
          </div>
          <div class="m-2">{event.title}</div>
          <div class="m-2">starts {event.startDate}</div>
          <div class="flex-flex-row m-2 items-center justify-center">
            <button
              on:click={handleClick}
              class="rounded-lg border border-rose-600 bg-white px-5 py-3 text-rose-600 hover:bg-rose-600 hover:text-white"
              >delete</button
            >
            <a href="/">
              <button
                class="mx-3 my-3 rounded-lg border border-rose-700 bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-400"
                >cancel</button
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <Loading />
{/if}
