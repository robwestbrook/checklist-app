<script>
  import { createEventDispatcher } from "svelte";

  export let item;

  const dispatch = createEventDispatcher();
</script>

<li
  class="text-right"
  on:mouseup={() =>
    dispatch("itemClicked", {
      label: item.label,
      action: item.action,
      params: item.params,
    })}
>
  <span
    class="block cursor-pointer rounded-lg p-2 hover:bg-white hover:text-fuchsia-700 md:p-4"
  >
    {item.label}
  </span>
</li>
