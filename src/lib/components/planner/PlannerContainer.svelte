<script>
  import PlannerBody from "./PlannerBody.svelte";
  export let plannerData;
</script>

<div
  class="container mx-auto space-y-3 rounded-b-md border-x-4 border-b-4 border-neutral-600 bg-neutral-200 py-3"
>
  {#each plannerData as day, index (day.date)}
    <PlannerBody {day} {index} currentDay={plannerData.currentDay} />
  {/each}
</div>
