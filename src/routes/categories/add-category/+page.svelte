<script>
  // Import Category Store
  import { categories } from "$lib/store/categoryStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";
  import Toast from "../../../lib/components/nav/Toast.svelte";

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
    categories.addCategory(data);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${data.name} added`;
  };
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      Add Category
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
            name="name"
            id="add-event-form__title"
            class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
            placeholder="category name"
          />
        </div>
        <div class="m-3 flex flex-row items-center justify-center">
          <input
            type="submit"
            class="my-3 rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
            value="add category"
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
