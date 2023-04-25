<script>
  import db from "$lib/data/db";
  import NewListItem from "$lib/components/listItems/NewListItem.svelte";
  import Toast from "$lib/components/nav/Toast.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { lists } from "$lib/store/listStore";
  import { listItems, listItemAddIndex } from "$lib/store/listItemStore";
  import { categories } from "$lib/store/categoryStore";
  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let loaded = false;
  let listId = $page.params.id;
  let list;
  let categoryName;
  let count = 0;
  let numberOfAdds = [1];
  $: items = $listItems.filter((l) => l.listId === parseInt(listId));

  onMount(async () => {
    list = await db.lists.get(parseInt(listId));
    console.log("items: ", items);
    let category = await db.categories
      .where("id")
      .equals(parseInt(list.categoryId))
      .toArray();
    categoryName = category[0].name;
    loaded = true;
  });

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    let data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    e.target.reset();
    let itemData;
    for (const item in data) {
      itemData = {
        text: data[item],
        listId: list.id,
        complete: false,
      };
      listItems.addItem(itemData);
    }
    $listItemAddIndex = 0;

    lists.changeUpdatedAtDate(list.id);

    $showToast = true;
    $toastType = "success";
    $toastMessage = `${itemData["text"]} added`;
  };

  const handleAddClick = () => {
    count = count + 1;
    numberOfAdds.push(1);
    numberOfAdds = numberOfAdds;
  };
</script>

{#if loaded}
  <div class="container mx-auto my-3 w-full">
    <div class="mx-auto my-3 w-11/12 rounded-lg bg-slate-100">
      <div
        class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
      >
        Add List Item
      </div>
      <div class="mx-auto my-3 w-11/12">
        <form on:submit|preventDefault={handleSubmit}>
          <div class="my-2 border-b border-rose-400 text-center">
            <h3
              class="w-11/12 rounded-lg px-2 pt-2 text-2xl font-bold md:mx-auto md:w-1/2 md:text-lg"
            >
              {list.title}
            </h3>
          </div>
          <div class="my-2 border-b border-rose-400 text-center">
            <h3
              class="w-11/12 rounded-lg px-2 pt-2 text-2xl font-bold md:mx-auto md:w-1/2 md:text-lg"
            >
              Category: {categoryName}
            </h3>
          </div>
          {#if items}
            {#each items as item}
              <div class="border-b border-blue-500 px-2 py-3 text-xl">
                {item.text}
              </div>
            {/each}
          {:else}
            <div class="border-b border-blue-500 px-2 pt-3 text-xl">
              this list has no items
            </div>
          {/if}
          {#each numberOfAdds as _}
            <NewListItem {count} />
          {/each}
          <div class="my-2 text-center">
            <button
              type="button"
              on:click={() => handleAddClick()}
              class="rounded-full bg-green-300 p-3 hover:bg-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-8 w-8 fill-white stroke-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </button>
          </div>
          <div class="my-2 flex flex-row items-center justify-around">
            <input
              type="submit"
              class="my-2 rounded-lg border border-fuchsia-700 bg-fuchsia-700 p-4 text-xl font-bold text-white hover:bg-fuchsia-500 md:text-lg"
              value="add items to list"
            />
            <a href="/">
              <button
                class="mx-3 my-3 rounded-lg border border-rose-700 bg-rose-500 p-4 text-xl font-bold text-white hover:bg-rose-400 md:text-lg"
                >cancel</button
              >
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<Toast />
