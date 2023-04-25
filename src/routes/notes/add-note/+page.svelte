<script>
  // Import List Store
  import { notes } from "$lib/store/noteStore";
  import { categories } from "$lib/store/categoryStore";

  import Toast from "$lib/components/nav/Toast.svelte";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  /**
   * Handle Form Submit
   *
   * @description Processes the Add Note Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the noteStore's addNote
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
    notes.addNote(data);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.title} added`;
  };
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto my-3 w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      Add Note
    </div>
    <div class="mx-auto my-3 w-11/12">
      {#if $categories}
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
              placeholder="list title"
            />
          </div>
          <div class="m-3 flex flex-row items-center">
            <label
              class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
              for="add-event-form__title">Note</label
            >
            <textarea
              type="text"
              name="text"
              id="add-event-form__title"
              class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
              placeholder="note text"
            />
          </div>
          <div class="my-2 flex flex-row items-center">
            <label
              class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
              for="add-event-form__allday">Note Category</label
            >
            <select
              name="categoryId"
              id="add-event-form__allday"
              class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
            >
              <option>- note category -</option>
              {#each $categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
          <div class="flex flex-row items-center justify-center">
            <input
              type="submit"
              class="rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
              value="add note"
            />
            <a href="/">
              <button
                class="mx-3 my-3 rounded-lg border border-rose-700 bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-400"
                >cancel</button
              >
            </a>
          </div>
        </form>
      {:else}
        <div class="text-center text-lg">
          There are no categories. A new note requires a category. Use the "Add
          Category" option in the top menu to add a category.
        </div>
      {/if}
    </div>
  </div>
</div>

<Toast />
