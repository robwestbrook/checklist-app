<script>
  // Import Components
  import Navbar from "../lib/components/nav/Navbar.svelte";
  import CalendarContainer from "../lib/components/calendar/CalendarContainer.svelte";
  import Modal from "../lib/components/modal/Modal.svelte";

  import AddEventModal from "../lib/components/event/AddEventModal.svelte";
  import EditEventModal from "../lib/components/event/EditEventModal.svelte";
  import DeleteEventModal from "../lib/components/event/DeleteEventModal.svelte";

  import AddCategoryModal from "../lib/components/category/AddCategoryModal.svelte";
  import ViewCategoriesModal from "../lib/components/category/ViewCategoriesModal.svelte";
  import EditCategoryModal from "../lib/components/category/EditCategoryModal.svelte";
  import DeleteCategoryModal from "../lib/components/category/DeleteCategoryModal.svelte";

  // Import Modal Stores
  import { modalOpen, modalAction } from "../lib/store/modalStore";
</script>

<svelte:head>
  <title>Remember</title>
</svelte:head>

<div>
  {#if modalOpen}
    <Modal>
      {#if $modalAction === "addEvent"}
        <AddEventModal />
      {:else if $modalAction === "editEvent"}
        <EditEventModal />
      {:else if $modalAction === "deleteEvent"}
        <DeleteEventModal />
      {:else if $modalAction === "addCategory"}
        <AddCategoryModal />
      {:else if $modalAction === "editCategory"}
        <EditCategoryModal />
      {:else if $modalAction === "deleteCategory"}
        <DeleteCategoryModal />
      {:else if $modalAction === "viewCategories"}
        <ViewCategoriesModal />
      {/if}
    </Modal>
  {/if}

  <Navbar />
  <CalendarContainer />
</div>
