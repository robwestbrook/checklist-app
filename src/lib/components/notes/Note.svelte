<script>
  import NoteActions from "./NoteActions.svelte";
  import { notes } from "../../store/noteStore";
  import { categories } from "../../store/categoryStore";
  import { dateToNamedMonth } from "../../library/list";

  export let note;

  $: thisNote = $notes.filter((n) => n.id === note.id);

  $: category = $categories.filter((c) => c.id == note.categoryId);
</script>

<div class="flex flex-col border-4 border-yellow-500 bg-yellow-300 p-5">
  <div class="border-b border-black pb-3">
    <div class="flex w-full flex-row">
      <div class="w-1/6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-8 w-8 fill-neutral-600"
          ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"
          />
        </svg>
      </div>
      <div class="w-5/6 text-2xl font-bold text-black">
        {thisNote[0].title}
      </div>
    </div>
  </div>
  <div class="border-b border-black">
    <div class="font-Handwriting text-lg text-black">
      {thisNote[0].text}
    </div>
  </div>
  <div class="flex flex-row items-center justify-between border-b border-black">
    <div class="py-2 text-xs text-black">
      category: {category[0].name}
    </div>
    <div class="py-2 text-xs text-black">
      {dateToNamedMonth(thisNote[0].createdAt)}
    </div>
  </div>
  <div
    class="my-1 rounded-lg bg-black py-1 text-center text-xs font-bold text-yellow-300"
  >
    this note is {thisNote[0].archived ? "archived" : "open"}
  </div>
  <div>
    <NoteActions note={thisNote} />
  </div>
</div>
