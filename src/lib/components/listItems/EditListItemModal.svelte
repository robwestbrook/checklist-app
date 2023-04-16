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

  import { lists } from "../../store/listStore";

  import { listItems } from "../../store/listItemStore";

  let loaded = false;
  let item;

  // On component mount, get the event from storage
  onMount(() => {
    item = $listItems.filter((e) => e.id === $modalItemId);
    loaded = true;
  });

  /**
   * Handle Form Submit
   *
   * @description Processes the Edit Category Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the categoryStore's editCategory
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
    data["complete"] = item[0].complete;
    data["listId"] = item[0].listId;
    listItems.editItem($modalItemId, data);
    $modalItemId = "";

    lists.changeUpdatedAtDate(item[0].listId);
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-row items-center">
        <label
          class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
          for="add-event-form__title">Text</label
        >
        <input
          type="text"
          name="text"
          bind:value={item[0].text}
          id="add-event-form__title"
          class="w-3/4 rounded-lg text-sm md:w-2/3 md:text-base"
          placeholder="event title"
        />
      </div>

      <div class="flex flex-row items-center justify-center">
        <input
          type="submit"
          class="my-3 rounded-lg border border-fuchsia-700 bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-500"
          value="edit list item"
        />
      </div>
    </form>
  </div>
{:else}
  Loading...
{/if}
