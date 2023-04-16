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
  import { notes } from "../../store/noteStore";

  import { showToast, toastType, toastMessage } from "../../store/toastStore";

  let loaded = false;
  let note;

  onMount(() => {
    note = $notes.filter((e) => e.id === $modalItemId);
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

    notes.editNote($modalItemId, {
      title: note[0].title,
      text: note[0].text,
      categoryId: note[0].categoryId,
      archived: !note[0].archived,
    });

    $modalItemId = "";

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${note[0].title} ${
      !note[0].archived ? "archived" : "unarchived"
    }`;
  };
</script>

{#if loaded}
  <div class="w-11/12">
    <div class="flex flex-col items-center justify-center">
      <div class="m-2 text-center text-xl font-bold">
        {note[0].archived ? "Unarchive" : "Archive"} this note?
      </div>
      <div class="m-2">{note[0].title}</div>
      <div class="m-2">
        <button
          on:click={handleClick}
          class="rounded-lg border border-blue-600 bg-white px-5 py-3 text-blue-600 hover:bg-blue-600 hover:text-white"
          >{note[0].archived ? "unarchive" : "archive"}</button
        >
      </div>
    </div>
  </div>
{:else}
  Loading...
{/if}
