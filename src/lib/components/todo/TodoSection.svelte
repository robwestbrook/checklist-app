<script>
  import TodoInput from "./TodoInput.svelte";
  import { todos } from "../../store/todoStore";
</script>

<section class="mt-8 space-y-4">
  {#each $todos as todo (todo.id)}
    <TodoInput {todo} />
  {/each}
</section>