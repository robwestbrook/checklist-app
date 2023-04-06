<script>
  import PlannerBody from "./PlannerBody.svelte";
  export let plannerData;

  let viewPlanner = true;

  const plannerOpen = () => {
    viewPlanner = !viewPlanner;
  };
</script>

<div
  class="container mx-auto space-y-3 rounded-b-md border-x-4 border-b-4 border-slate-600 bg-slate-100 py-3"
>
  <div class="text-center">
    <button
      on:click={() => plannerOpen()}
      class="rounded-lg border border-cyan-500 bg-cyan-500 px-4 py-1 font-semibold text-black drop-shadow-lg hover:bg-white hover:text-cyan-500"
    >
      {viewPlanner ? "Close" : "View"} Planner
    </button>
  </div>
  <div class="{viewPlanner ? 'block' : 'hidden'} ">
    {#each plannerData as day, index (day.date)}
      <PlannerBody {day} {index} currentDay={plannerData.currentDay} />
    {/each}
  </div>
</div>
