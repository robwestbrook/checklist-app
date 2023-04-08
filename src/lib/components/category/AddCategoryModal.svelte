<script>
  // Import Modal Stores
  import {
    modalOpen,
    modalDate,
    modalAction,
    modalTitle,
  } from "../../store/modalStore";

  // Import Category Store
  import { categories } from "../../store/categoryStore";

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
    categories.addCategory(data);
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
        name="name"
        id="add-event-form__title"
        class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
        placeholder="category name"
      />
    </div>
    <div class="m-3 flex flex-row items-center justify-center">
      <input
        type="submit"
        class="rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
        value="add category"
      />
    </div>
  </form>
</div>
