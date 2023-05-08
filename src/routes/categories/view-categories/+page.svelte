<script>
  // Import Category Store
  import { categories } from "$lib/store/categoryStore";
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      All Categories
    </div>
    <div class="mx-auto my-1 w-11/12">
      {#each $categories as category}
        <div
          class="my-1 flex w-full flex-row items-center rounded-lg border border-slate-200"
        >
          <div class="m-2 w-8/12 text-lg font-semibold">
            {category.name}
          </div>
          <div class="w-2/12">
            <a href="/categories/edit-category/{category.id}">
              <button class="rounded-lg p-2 hover:bg-green-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 fill-white stroke-green-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </a>
          </div>
          <div class="w-2/12">
            <a href="/categories/delete-category/{category.id}">
              <button class="rounded-lg p-2 hover:bg-rose-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 fill-white stroke-rose-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
