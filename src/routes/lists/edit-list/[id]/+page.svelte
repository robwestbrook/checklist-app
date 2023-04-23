<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import db from "$lib/data/db";

  import Loading from "$lib/components/loading/Loading.svelte";
  import Toast from "$lib/components/nav/Toast.svelte";

  // Import Event Store
  import { lists } from "$lib/store/listStore";
  import { categories } from "$lib/store/categoryStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let loaded = false;
  let id = parseInt($page.params.id);
  let list;

  // On component mount, get the event from storage
  onMount(async () => {
    list = await db.lists.get(id);
    console.log(list);
    loaded = true;
  });

  /**
   * Handle Form Submit
   *
   * @description Processes the Edit List Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the listStore's editList
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
    // Convert string "true" or "false" to boolean
    data.archived = JSON.parse(data.archived);

    console.log(data);
    lists.editList(id, data);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.title} updated`;
  };
</script>

{#if loaded}
  <div class="container mx-auto my-3 w-full">
    <div class="mx-auto my-3 w-11/12 rounded-lg bg-slate-100">
      <div
        class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
      >
        Edit List
      </div>
      <div class="mx-auto my-3 w-11/12">
        <form on:submit|preventDefault={handleSubmit}>
          <div class="flex flex-row items-center">
            <label
              class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
              for="add-event-form__title">Title</label
            >
            <input
              type="text"
              name="title"
              bind:value={list.title}
              id="add-event-form__title"
              class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
              placeholder="event title"
            />
          </div>
          <div class="my-2 flex flex-row items-center">
            <label
              class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
              for="add-event-form__allday">List Category</label
            >
            <select
              name="categoryId"
              bind:value={list.categoryId}
              id="add-event-form__allday"
              class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
            >
              <option>- list category -</option>
              {#each $categories as category}
                <option value={category.id.toString()}>{category.name}</option>
              {/each}
            </select>
          </div>
          <div class="my-2 flex flex-row items-center">
            <label
              class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
              for="add-event-form__allday">List Archived</label
            >
            <select
              name="archived"
              bind:value={list.archived}
              id="add-event-form__allday"
              class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
            >
              <option>- list archived -</option>
              <option value={true}>yes</option>
              <option value={false}>no</option>
            </select>
          </div>
          <div class="flex flex-row items-center justify-center">
            <input
              type="submit"
              class="rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
              value="edit list"
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
