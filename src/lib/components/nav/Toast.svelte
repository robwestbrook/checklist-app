<script>
  import InfoSvg from "./InfoSVG.svelte";
  import ErrorSvg from "./ErrorSVG.svelte";
  import SuccessSvg from "./SuccessSVG.svelte";

  import { showToast, toastType, toastMessage } from "../../store/toastStore";

  $: toastOn = $showToast;
  $: type = $toastType;
  $: message = $toastMessage;

  const closeToast = () => {
    console.log("in closeToast");
    $showToast = false;
    $toastType = "";
    $toastMessage = "";
  };
</script>

<div
  class="fixed bottom-5 right-1 max-w-screen-sm rounded-lg border-2 border-x-8 px-5 py-4 drop-shadow-lg md:right-5
    {toastOn ? '' : 'hidden'} 
    {type === 'info' ? 'border-blue-500 bg-blue-200' : ''} 
    {type === 'error' ? 'border-rose-500 bg-rose-200' : ''}
    {type === 'success' ? 'border-green-500 bg-green-200' : ''}"
>
  <div class="flex flex-row items-center justify-between">
    <span>
      {#if type === "info"}
        <InfoSvg />
      {:else if type === "success"}
        <SuccessSvg />
      {:else if type === "error"}
        <ErrorSvg />
      {/if}
    </span>
    <span class="m-3 text-sm">{message}</span>
    <span>
      <button on:click={closeToast} class="hover:rounded-full hover:bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </span>
  </div>
</div>
