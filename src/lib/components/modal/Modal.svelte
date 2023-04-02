<script>
  import { modalOpen, modalTitle } from "../../store/modalStore";
</script>

{#if $modalOpen}
  <div
    class="modal fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-8 lg:p-0"
  >
    <div class="modal-overlay fixed h-full w-full bg-gray-900 opacity-70" />
    <div
      class="z-50 mx-auto w-full overflow-y-auto rounded-lg bg-white shadow-xl md:h-max md:w-1/2"
    >
      <div
        class="head flex items-center justify-between bg-fuchsia-700 px-8 py-5 text-2xl font-extrabold text-white"
      >
        {$modalTitle ? $modalTitle : "No title"}
        <button
          class="ml-4 rounded-full border-4 border-neutral-800 bg-neutral-500 p-2 hover:bg-red-600"
          on:click={() => ($modalOpen = !$modalOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-6 w-6 fill-white"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            /></svg
          >
        </button>
      </div>
      <div class="content p-2">
        <slot />
      </div>
    </div>
  </div>
{/if}
