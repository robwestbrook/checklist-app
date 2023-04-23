<script>
  // Import Components
  import CalendarContainer from "../lib/components/calendar/CalendarContainer.svelte";
  import Modal from "../lib/components/modal/Modal.svelte";

  import ListContainer from "../lib/components/list/ListContainer.svelte";

  import AddListItemModal from "../lib/components/listItems/AddListItemModal.svelte";
  import EditListItemModal from "../lib/components/listItems/EditListItemModal.svelte";
  import DeleteListItemModal from "../lib/components/listItems/DeleteListItemModal.svelte";

  import NoteContainer from "../lib/components/notes/NoteContainer.svelte";
  import AddNoteModal from "../lib/components/notes/AddNoteModal.svelte";
  import EditNoteModal from "../lib/components/notes/EditNoteModal.svelte";
  import ArchiveNoteModal from "../lib/components/notes/ArchiveNoteModal.svelte";
  import DeleteNoteModal from "../lib/components/notes/DeleteNoteModal.svelte";

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
      {#if $modalAction === "addListItem"}
        <AddListItemModal />
      {:else if $modalAction === "editListItem"}
        <EditListItemModal />
      {:else if $modalAction === "deleteListItem"}
        <DeleteListItemModal />
      {:else if $modalAction === "addNote"}
        <AddNoteModal />
      {:else if $modalAction === "editNote"}
        <EditNoteModal />
      {:else if $modalAction === "archiveNote"}
        <ArchiveNoteModal />
      {:else if $modalAction === "deleteNote"}
        <DeleteNoteModal />
      {:else if $modalAction === "uploadFile"}
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
