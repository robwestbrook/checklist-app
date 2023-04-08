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
  import { categories } from "../../store/categoryStore";

  let loaded = false;
  let category;

  onMount(() => {
    category = $categories.filter((e) => e.id === $modalItemId);
    loaded = true;
  });

  /**
   * Handle Delete
   *
   * @description When the delete button is clicked,
   * clear all modal stores and call deleteCategory
   * method, passing in the event ID
   * @function handleClick
   */
  const handleClick = () => {
    $modalAction = "";
    $modalTitle = "";
    $modalItemType = "";
    $modalOpen = !$modalOpen;

    categories.deleteCategory($modalItemId);

    $modalItemId = "";
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <div class="flex flex-col items-center justify-center">
      <div class="m-2 text-center text-xl font-bold">Delete this category?</div>
      <div class="m-2">{category[0].name}</div>
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
