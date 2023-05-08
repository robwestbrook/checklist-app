<script>
  import db from "$lib/data/db";

  import Loading from "$lib/components/loading/Loading.svelte";

  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  // Import categories Store
  import { categories } from "$lib/store/categoryStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let loaded = false;
  let id = parseInt($page.params.id);
  let category;

  onMount(async () => {
    category = await db.categories.get(id);
    loaded = true;
  });

  /**
   * Handle Delete
   *
   * @description When the delete button is clicked,
   * clear all modal stores and call deleteCategory
   * method, passing in the event ID
   * @function handleClick
   */
  const handleClick = async () => {
    try {
      categories.deleteCategory(id);
      goto("/");
    } catch (err) {
      console.log(err);
      $showToast = true;
      $toastType = "error";
      $toastMessage = `Error! ${err.message}`;
    }
  };
</script>

{#if loaded}
  <div class="container mx-auto my-3 w-full">
    <div class="mx-auto my-3 w-11/12 rounded-lg bg-slate-100">
      <div
        class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
      >
        Delete Category
      </div>
      <div class="mx-auto my-3 w-11/12">
        <div class="flex flex-col items-center justify-center">
          <div class="m-2 text-center text-xl font-bold">
            Delete this category?
          </div>
          <div class="m-2">{category.name}</div>
          <div class="m-2">
            <button
              on:click={handleClick}
              class="rounded-lg border border-rose-600 bg-white px-5 py-3 text-rose-600 hover:bg-rose-600 hover:text-white"
              >delete</button
            >
            <a href="/">
              <button
                class="mx-3 mb-3 rounded-lg border border-rose-700 bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-400"
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
