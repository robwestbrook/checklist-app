<script>
  import Toast from "$lib/components/nav/Toast.svelte";
  import { backupIndexedDBDatabase } from "$lib/library/dbFunctions";
  import { version } from "$lib/library/version";
  import { showToast, toastType, toastMessage } from "$lib/store/toastStore";

  const handleClick = async () => {
    try {
      let backup = await backupIndexedDBDatabase(
        version.dbName,
        version.dbBackupName
      );
      if (backup) {
        console.log("Backup created");
        $showToast = true;
        $toastType = "success";
        $toastMessage = "Backup created. Download now";
      } else {
        throw new Error("failed to create backup");
        alert(`There was a problem. Please try again.`);
      }
    } catch (err) {
      console.error("Failed to create backup: ", err);
    }
  };
</script>

<div class="container mx-auto my-3 w-full">
  <div class="mx-auto w-11/12 rounded-lg bg-slate-100">
    <div
      class="flex items-center justify-between rounded-t-lg bg-fuchsia-700 px-8 py-2 text-xl font-bold text-white drop-shadow-lg"
    >
      Backup Database
    </div>
    <div class="m-3 flex w-full flex-col items-center justify-start">
      <p>
        Click the button below to backup your database. The file will be saved
        with a name that looks like this:
      </p>
      <p class="ml-0 text-left text-sm font-bold md:text-lg">
        rememberDB-backup-mm-dd-yyyy.json
      </p>
      <button
        on:click={handleClick}
        class="m-3 rounded-lg bg-fuchsia-700 px-3 py-2 font-bold text-white hover:bg-fuchsia-500"
        >Backup Database</button
      >
    </div>
  </div>
</div>

<Toast />
