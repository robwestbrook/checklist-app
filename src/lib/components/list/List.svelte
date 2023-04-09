<script>
  import { onMount } from "svelte";
  import ListActions from "./ListActions.svelte";
  import ListItem from "../listItems/ListItem.svelte";
  import { lists } from "../../store/listStore";
  import { listItems } from "../../store/listItemStore";
  import { categories } from "../../store/categoryStore";
  import { dateToNamedMonth } from "../../library/list";
  export let list;

  let loaded = false;
  let categoryName;

  // To make category reactive on list edit
  $: if (list.categoryId) {
    let category = $categories.filter((c) => c.id == list.categoryId);
    categoryName = category[0].name;
    loaded = true;
  }

  $: items = $listItems.filter((i) => i.listId == list.id);
</script>

{#if loaded}
  <div
    class="mx-auto flex w-11/12 flex-col items-center rounded-lg border-4 border-slate-500 bg-slate-100 p-2 text-black"
  >
    <div class="flex w-full flex-row p-2">
      <span class="w-1/6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="h-8 w-8 fill-neutral-600"
          ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
            d="M184.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L39 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L39 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM256 96c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H288c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H288c-17.7 0-32-14.3-32-32zM192 416c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zM80 464c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z"
          /></svg
        >
      </span>
      <span class="w-5/6 text-2xl font-bold"> {list.title}</span>
    </div>
    <div class="w-full border-b border-blue-200 p-2">
      <span class="text-lg font-bold"> category: {categoryName} </span>
    </div>
    {#if items}
      {#each items as item}
        {#key item.id}
          <ListItem id={item.id} />
        {/key}
      {/each}
    {/if}

    <div class="my-2 flex w-full flex-row items-center justify-between">
      <div class="p-2 text-xs">
        created: {dateToNamedMonth(list.createdAt, 3)}
      </div>
      <div class="p-2 text-xs">
        updated: {dateToNamedMonth(list.updatedAt, 3)}
      </div>
    </div>
    <ListActions {list} />
  </div>
{/if}
