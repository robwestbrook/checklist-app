<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import db from "$lib/data/db";

  import Toast from "$lib/components/nav/Toast.svelte";
  import Loading from "$lib/components/loading/Loading.svelte";

  import { lists } from "$lib/store/listStore";

  import { listItems } from "$lib/store/listItemStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let loaded = false;
  let id = parseInt($page.params.id);
  let item;

  onMount(async () => {
    item = await db.listItems.get(id);
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
    listItems.deleteItem(id);

    lists.changeUpdatedAtDate(item.listId);

    item.text = `${item.text} deleted`;

    $showToast = true;
    $toastType = "success";
    $toastMessage = "List item deleted";
  };
</script>

{#if loaded}
  <div class="container mx-auto my-3 w-full">
    <div class="mx-auto my-3 w-11/12 rounded-lg bg-slate-100">
      <div
        class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
      >
        Delete List Item
      </div>
      <div class="mx-auto my-3 w-11/12">
        <div class="flex flex-col items-center justify-center">
          <div class="m-2 text-center text-xl font-bold">
            Delete this list item?
          </div>
          <div class="m-2">{item.text}</div>
          <div class="m-2 flex flex-row items-center justify-center">
            <button
              on:click={handleClick}
              class="rounded-lg border border-rose-600 bg-white px-5 py-3 text-rose-600 hover:bg-rose-600 hover:text-white"
              >delete</button
            >
            <a href="/">
              <button
                class="mx-3 my-3 rounded-lg border border-rose-700 bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-400"
                >cancel</button
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <Loading />
{/if}

<Toast />
