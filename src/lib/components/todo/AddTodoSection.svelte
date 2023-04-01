<script>
  import {addTodo} from '../../store/todoStore';
</script>

<section class="flex justify-between">
  <h3 class="text-xl font-bold text-gray-three">Checklist</h3>
  <button 
    class="group flex items-center rounded-md border-cream-four bg-green-one px-6 py-3 text-lg text-gray-five outline outline-2 outline-offset-2 outline-green-one hover:text-green-five focus-visible:text-green-5 focus-visible:outline-green-five"
    type="button" 
    on:click={addTodo}
  >
    Add Task
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      class="
        ml-3 h-6 w-6 stroke-green-one stroke-2 group-hover:fill-green-five group-focus-visible:fill-green-five
      ">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    
  </button>
</section>