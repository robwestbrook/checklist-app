<script>
  import { version } from "$lib/library/version";
  import {
    processUploadedJsonFile,
    importDataToIndexedDBDatabase,
  } from "$lib/library/dbFunctions";

  import Toast from "$lib/components/nav/Toast.svelte";

  import { categories } from "$lib/store/categoryStore";
  import { events } from "$lib/store/eventStore";
  import { listItems } from "$lib/store/listItemStore";
  import { lists } from "$lib/store/listStore";
  import { notes } from "$lib/store/noteStore";

  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  let fileName;

  /**
   * Handle Form Submit
   *
   * @description Processes a backup request.
   *
   * @function handleSubmit
   * @param {Object} e Event Object
   */
  const handleSubmit = async (e) => {
    processUploadedJsonFile(e.target, async (error, json) => {
      // If there's an error processing JSON file
      if (error) {
        console.log("Error processing JSON file: ", error);
        $showToast = true;
        $toastType = "error";
        $toastMessage = `${error}`;
      }

      // Import data into database
      try {
        let restore = await importDataToIndexedDBDatabase(version.dbName, json);
        if (restore) {
          await categories.restore();
          await events.restore();
          await listItems.restore();
          await lists.restore();
          await notes.restore();
          console.log("Database restored");

          $showToast = true;
          $toastType = "success";
          $toastMessage = `Database restored. Please refresh page.`;
        } else {
          throw new Error(`Could not restore database`);
        }
      } catch (err) {
        console.log("Error restoring database: ", err);

        $showToast = true;
        $toastType = "error";
        $toastMessage = `${err}`;
      }
    });
  };
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      Restore Database
    </div>
    <div class="m-3 flex w-full flex-col items-center justify-start">
      <p>Select your backup file. The file name will begin look like this:</p>
      <p class="ml-0 text-left text-sm font-bold md:text-lg">
        rememberDB-backup-mm-dd-yyyy.json
      </p>
      <input
        on:change={handleSubmit}
        type="file"
        name="fileName"
        bind:value={fileName}
        id="add-event-form__title"
        class="file-border-white m-3 w-2/4 file:rounded-lg file:border file:border-solid file:bg-fuchsia-700 file:px-3 file:py-2 file:text-sm file:text-white hover:file:bg-fuchsia-500 md:w-2/3 md:text-base"
        placeholder=""
      />
    </div>
  </div>
</div>

<Toast />
