<script>
  import List from "./List.svelte";
  import { modalOpen, modalAction, modalTitle } from "../../store/modalStore";
  import { lists } from "../../store/listStore";

  let viewLists = true;

  const listsOpen = () => {
    viewLists = !viewLists;
  };

  const handleNewListClick = () => {
    $modalOpen = !$modalOpen;
    $modalTitle = "Add List";
    $modalAction = "addList";
  };
</script>

<div
  class="container mx-auto space-y-3 rounded-b-md border-x-4 border-b-4 border-slate-600 bg-black py-3"
>
  <div class="text-center">
    <button
      on:click={() => listsOpen()}
      class="rounded-lg border border-cyan-500 bg-cyan-500 px-4 py-1 font-semibold text-black drop-shadow-lg hover:bg-white hover:text-cyan-500"
    >
      {viewLists ? "Hide" : "View"} Lists
    </button>
  </div>
  <div
    class="m-5 flex flex-row items-center justify-between {viewLists
      ? 'block'
      : 'hidden'}"
  >
    <h1 class="text-2xl font-bold text-white">Lists</h1>

    <button
      on:click={() => handleNewListClick()}
      class="flex flex-row items-center justify-between rounded-lg border border-fuchsia-600 bg-fuchsia-600 fill-white px-4 py-2 font-bold text-white hover:bg-white hover:fill-fuchsia-600 hover:text-fuchsia-600"
    >
      <span class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-4 w-4"
          ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          /></svg
        >
      </span>
      <span>Add New List</span>
    </button>
  </div>
  <div class={viewLists ? "block" : "hidden"}>
    {#if $lists}
      <div
        class="container mx-auto my-1 grid w-11/12 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {#each $lists as list}
          <List {list} />
        {/each}
      </div>
    {:else}
      <div class="fornt-bold text-center text-xl text-white">No lists yet</div>
    {/if}
  </div>
</div>
