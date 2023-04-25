<script>
  // Import Components
  import CalendarContainer from "../lib/components/calendar/CalendarContainer.svelte";
  import Modal from "../lib/components/modal/Modal.svelte";

  import ListContainer from "../lib/components/list/ListContainer.svelte";

  import NoteContainer from "../lib/components/notes/NoteContainer.svelte";

  import UploadJsonFile from "../lib/components/backup/UploadJSONFile.svelte";

  import Footer from "../lib/components/nav/Footer.svelte";

  import Toast from "../lib/components/nav/Toast.svelte";

  // Import Modal Stores
  import { modalOpen, modalAction } from "../lib/store/modalStore";
</script>

<svelte:head>
  <title>Remember</title>
</svelte:head>

<div>
  {#if modalOpen}
    <Modal>
      {#if $modalAction === "uploadFile"}
        <UploadJsonFile />
      {/if}
    </Modal>
  {/if}

  <CalendarContainer />
  <ListContainer />
  <NoteContainer />
  <Footer />

  <Toast />
</div>
