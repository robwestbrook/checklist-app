<script>
  import { listItems } from "../../store/listItemStore";
  import {
    modalAction,
    modalTitle,
    modalItemType,
    modalItemId,
    modalOpen,
  } from "../../store/modalStore";
  export let id;

  $: item = $listItems.filter((i) => i.id === id);

  const handleCompletedClick = () => {
    let data = {
      text: item[0].text,
      listId: item[0].listId,
      complete: !item[0].complete,
    };
    listItems.editItem(item[0].id, data);
  };

  const handleEditClick = () => {
    $modalAction = "editListItem";
    $modalTitle = "Edit List Item";
    $modalItemType = "listItem";
    $modalItemId = item[0].id;
    $modalOpen = !$modalOpen;
  };

  const handleDeletedClick = () => {
    $modalAction = "deleteListItem";
    $modalTitle = "Delete List Item";
    $modalItemType = "listItem";
    $modalItemId = item[0].id;
    $modalOpen = !$modalOpen;
  };
</script>

<div
  class="flex w-full flex-row items-center justify-items-start border-b border-rose-300"
>
  <div class="pl-5 pr-1">
    <div
      class="flex w-full flex-row items-center border-b border-blue-300 pt-2 text-xl"
    >
      {#if item[0].complete}
        <span>
          <button on:click={handleCompletedClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="h-6 w-6"
              ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              /></svg
            >
          </button>
        </span>
      {:else}
        <span>
          <button on:click={handleCompletedClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="h-6 w-6"
              ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"
              /></svg
            >
          </button>
        </span>
      {/if}
    </div>
  </div>
  <button class="px-1" on:click={handleEditClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="h-6 w-6 rounded-sm border border-green-500 bg-green-500 fill-white p-1 hover:bg-white hover:fill-green-500"
      ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
      />
    </svg>
  </button>
  <div class="pl-1 pr-5">
    <button on:click={handleDeletedClick} class="mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="h-6 w-6 rounded-sm border border-red-500 bg-red-500 fill-white p-1 hover:bg-white hover:fill-red-500"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
        />
      </svg>
    </button>
  </div>
  <div class="text-lg">
    {#if item[0].complete}
      <span
        class="font-Handwriting text-slate-500 line-through decoration-slate-500 decoration-double"
      >
        {item[0].text}
      </span>
    {:else}
      <span class="font-Handwriting">
        {item[0].text}
      </span>
    {/if}
  </div>
</div>
