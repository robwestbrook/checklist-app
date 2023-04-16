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
  class="container mx-auto space-y-3 border-x-4 border-b-4 border-slate-600 bg-black py-3"
>
  <div class="mx-2">
    <button
      on:click={() => listsOpen()}
      class="flex flex-row items-center justify-center rounded-lg border-2 border-purple-600 bg-black px-4 py-1 text-xs font-bold text-white drop-shadow-lg hover:bg-purple-600 hover:text-white"
    >
      <span class="mr-2">
        {#if !viewLists}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-4 w-4 stroke-white stroke-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-4 w-4 stroke-white stroke-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        {/if}
      </span>

      <span>
        {viewLists ? "Hide" : "View"} Lists
      </span>
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
          {#key list.id}
            <List {list} />
          {/key}
        {/each}
      </div>
    {:else}
      <div class="fornt-bold text-center text-xl text-white">No lists yet</div>
    {/if}
  </div>
</div>
