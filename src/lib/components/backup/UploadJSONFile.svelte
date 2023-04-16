<script>
  import { version } from "../../library/version";
  import {
    processUploadedJsonFile,
    importDataToIndexedDBDatabase,
  } from "../../library/dbFunctions";

  // Import Modal Stores
  import {
    modalOpen,
    modalDate,
    modalAction,
    modalTitle,
  } from "../../store/modalStore";

  import { categories } from "../../store/categoryStore";
  import { events } from "../../store/eventStore";
  import { listItems } from "../../store/listItemStore";
  import { lists } from "../../store/listStore";
  import { notes } from "../../store/noteStore";

  let fileName;

  /**
   * Handle Form Submit
   *
   * @description Processes the Add Event Form. Closes
   * the modal, and resets the modal stores. Loops over
   * the submitted for data and converts the data into
   * an object. Then calls the eventStore's addEvent
   * method, passing in the form data object.
   *
   * @function handleSubmit
   * @param {Object} e Event Object
   */
  const handleSubmit = async (e) => {
    $modalOpen = !$modalOpen;
    $modalDate = "";
    $modalAction = "";
    $modalTitle = "";

    processUploadedJsonFile(e.target, async (error, json) => {
      if (error) {
        console.log("Error processing JSON file: ", error);
      }

      try {
        let restore = await importDataToIndexedDBDatabase(version.dbName, json);
        if (restore) {
          await categories.restore();
          await events.restore();
          await listItems.restore();
          await lists.restore();
          await notes.restore();
          console.log("Database restored");
          alert("Database restored. Please refresh page.");
        } else {
          throw new Error(`Could not restore database`);
        }
      } catch (err) {
        console.log("Error restoring database: ", err);
        alert("There was a problem. Please try again.");
      }
    });
  };
</script>

<div class="w-11/12">
  <div class="flex flex-row items-center">
    <label
      class="w-1/4 pr-5 text-right text-sm font-bold md:w-1/3 md:text-base"
      for="add-event-form__title">backup file</label
    >
    <input
      on:change={handleSubmit}
      type="file"
      name="fileName"
      bind:value={fileName}
      id="add-event-form__title"
      class="file-border-white w-2/4 file:rounded-lg file:border file:border-solid file:bg-fuchsia-700 file:px-3 file:py-2 file:text-sm file:text-white hover:file:bg-fuchsia-500 md:w-2/3 md:text-base"
      placeholder="select file"
    />
  </div>
</div>
