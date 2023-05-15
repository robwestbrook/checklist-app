<script>
  export let message;
  export let topOrBottom;
  export let leftOrRight;

  let x = "";
  let y = "";

  if (topOrBottom === "top") {
    x = "-top-12";
  } else {
    x = "top-7";
  }

  if (leftOrRight === "left") {
    y = "-left-24";
  } else {
    y = "left-0";
  }
</script>

<span
  class="z-100 invisible absolute {y} {x} w-36 max-w-xs space-y-1 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-gray-50 opacity-80 shadow-lg group-hover:visible"
>
  {message}
</span>
