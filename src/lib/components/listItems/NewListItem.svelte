<script>
  import { listItemAddIndex } from "../../store/listItemStore.js";
  let index = $listItemAddIndex;
  export let count;
  $listItemAddIndex = $listItemAddIndex + 1;
  count = count;
</script>

<div class="my-2 border-b border-blue-500">
  <input
    type="text"
    name="item-{index}"
    id="add-to-list-form__item-{index}"
    class="form-input w-11/12 rounded-lg border-0 bg-slate-100 text-xl focus:ring-0 md:w-1/2 md:text-lg"
    placeholder="add item to list"
  />
</div>
