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

  // Import Event Store
  import { lists } from "../../store/listStore";

  let loaded = false;
  let list;

  onMount(() => {
    list = $lists.filter((e) => e.id === $modalItemId);
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

    lists.editList($modalItemId, {
      title: list[0].title,
      categoryId: list[0].categoryId,
      archived: !list[0].archived,
    });

    $modalItemId = "";
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <div class="flex flex-col items-center justify-center">
      <div class="m-2 text-center text-xl font-bold">
        {list[0].archived ? "Unarchive" : "Archive"} this list?
      </div>
      <div class="m-2">{list[0].title}</div>
      <div class="m-2">
        <button
          on:click={handleClick}
          class="rounded-lg border border-blue-600 bg-white px-5 py-3 text-blue-600 hover:bg-blue-600 hover:text-white"
          >{list[0].archived ? "unarchive" : "archive"}</button
        >
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
