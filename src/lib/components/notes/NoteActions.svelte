<script>
  import {
    modalOpen,
    modalAction,
    modalItemId,
    modalItemType,
    modalTitle,
  } from "../../store/modalStore";
  export let note;

  const handleNoteEdit = () => {
    $modalAction = "editNote";
    $modalTitle = "Edit Note";
    $modalItemType = "note";
    $modalItemId = note[0].id;
    $modalOpen = !$modalOpen;
  };

  const handleNoteArchive = () => {
    $modalAction = "archiveNote";
    $modalTitle = "Archive Note";
    $modalItemType = "note";
    $modalItemId = note[0].id;
    $modalOpen = !$modalOpen;
  };

  const handleNoteDelete = () => {
    $modalAction = "deleteNote";
    $modalTitle = "Delete Note";
    $modalItemType = "note";
    $modalItemId = note[0].id;
    $modalOpen = !$modalOpen;
  };
</script>

<div class="flex w-full flex-row items-center justify-between py-2">
  <div
    class="mx-auto flex flex-col items-center rounded-lg border border-green-500 bg-green-500 hover:bg-green-600"
  >
    <div class="px-2 pt-2 text-xs font-bold">edit</div>
    <button on:click={handleNoteEdit}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="h-8 w-8 rounded-lg stroke-white p-1"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
        />
      </svg>
    </button>
  </div>

  <div
    class="mx-auto flex flex-col items-center rounded-lg border border-blue-500 bg-blue-500 hover:bg-blue-600 {note[0]
      .archived
      ? 'opacity-40'
      : ''}"
  >
    <div class="px-2 pt-2 text-xs font-bold">archive</div>
    <button class="px-2" on:click={handleNoteArchive}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="h-8 w-8 rounded-lg p-1"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"
        />
      </svg>
    </button>
  </div>

  <div
    class="mx-auto flex flex-col items-center rounded-lg border border-red-500 bg-red-500 hover:bg-red-600"
  >
    <div class="px-2 pt-2 text-xs font-bold">delete</div>
    <button class="px2" on:click={handleNoteDelete}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="h-8 w-8 rounded-lg p-1"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
        />
      </svg>
    </button>
  </div>
</div>
