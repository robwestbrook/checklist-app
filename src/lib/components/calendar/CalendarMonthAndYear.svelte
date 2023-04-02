<script>
  export let monthAndYear;
</script>

<div
  class="ml-3 mt-4 w-1/3 border border-neutral-400 bg-white drop-shadow-lg md:w-1/2 md:rounded-lg"
>
  <div class="flex h-full flex-col place-content-center place-items-center">
    <div class="text-center text-2xl font-extrabold md:text-6xl">
      {monthAndYear.split(" ")[0]}
    </div>
    <div class="text-center text-3xl font-extrabold md:text-6xl">
      {monthAndYear.split(" ")[1]}
    </div>
  </div>
</div>
