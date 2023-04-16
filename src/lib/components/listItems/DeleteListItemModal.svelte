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

  // Import Event Store
  import { listItems } from "../../store/listItemStore";

  import { showToast, toastType, toastMessage } from "../../store/toastStore";

  let loaded = false;
  let item;

  onMount(() => {
    item = $listItems.filter((e) => e.id === $modalItemId);
    loaded = true;
  });

  /**
   * Handle Form Submit
   *
   * @description When the delete button is clicked,
   * clear all modal stores and call deleteList
   * method, passing in the list ID
   * @function handleSubmit
   */
  const handleClick = () => {
    $modalAction = "";
    $modalTitle = "";
    $modalItemType = "";
    $modalOpen = !$modalOpen;

    listItems.deleteItem($modalItemId);

    $modalItemId = "";

    lists.changeUpdatedAtDate(item[0].listId);

    $showToast = true;
    $toastType = "success";
    $toastMessage = "List item deleted";
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <div class="flex flex-col items-center justify-center">
      <div class="m-2 text-center text-xl font-bold">
        Delete this list item?
      </div>
      <div class="m-2">{item[0].text}</div>
      <div class="m-2">
        <button
          on:click={handleClick}
          class="rounded-lg border border-rose-600 bg-white px-5 py-3 text-rose-600 hover:bg-rose-600 hover:text-white"
          >delete</button
        >
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
