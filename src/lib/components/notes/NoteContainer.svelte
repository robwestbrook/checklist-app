<script>
  import Note from "./Note.svelte";
  import { modalOpen, modalAction, modalTitle } from "../../store/modalStore";
  import { notes } from "../../store/noteStore";
  let viewNotes = true;
  let displayNotesView = "All";

  const notesOpen = () => {
    viewNotes = !viewNotes;
  };

  const handleNewNoteClick = () => {
    $modalOpen = !$modalOpen;
    $modalTitle = "Add Note";
    $modalAction = "addNote";
  };
</script>

<div
  class="container mx-auto space-y-3 rounded-b-md border-x-4 border-b-4 border-slate-600 bg-black py-3"
>
  <div class="mx-auto w-11/12">
    <div class="mb-3">
      <button
        on:click={() => notesOpen()}
        class="flex flex-row items-center justify-center rounded-lg border-2 border-yellow-500 bg-black px-4 py-1 text-xs font-semibold text-white drop-shadow-lg hover:bg-yellow-300 hover:text-black"
      >
        <span class="mr-2">
          {#if !viewNotes}
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
          {viewNotes ? "Hide" : "View"} Notes
        </span>
      </button>
    </div>
    <div class=" {viewNotes ? 'block' : 'hidden'}">
      <div class="flex flex-row items-center justify-around">
        <h2 class="mb-3 text-2xl font-bold text-white">
          {displayNotesView} Notes
        </h2>
        <div class="mb-3">
          <select
            bind:value={displayNotesView}
            class="rounded-lg border-black bg-yellow-300 text-sm text-black placeholder-black ring-2 ring-black focus:ring-2 focus:ring-black md:text-lg"
          >
            <option class="text-sm">- Change Note View -</option>
            <option class="text-sm" value="All">All Notes</option>
            <option class="text-sm" value="Open">Only Open Notes</option>
          </select>
        </div>
      </div>
      <div class="m-2 flex w-full justify-center">
        <a href="/notes/add-note">
          <button
            class="flex flex-row items-center rounded-lg border-2 border-yellow-300 bg-black px-2 py-1 text-white hover:bg-yellow-300 hover:text-black"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            <span class="text-bold ml-1"> add new note </span>
          </button>
        </a>
      </div>
      <div
        class="container mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {#each $notes as note}
          {#if displayNotesView === "Open"}
            {#if note.archived === false}
              {#key note.id}
                <Note {note} />
              {/key}
            {/if}
          {:else}
            {#key note.id}
              <Note {note} />
            {/key}
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
