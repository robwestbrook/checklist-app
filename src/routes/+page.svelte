<script>
  // Import Components
  import Navbar from "../lib/components/nav/Navbar.svelte";
  import CalendarContainer from "../lib/components/calendar/CalendarContainer.svelte";
  import Modal from "../lib/components/modal/Modal.svelte";
  import AddEventModal from "../lib/components/event/AddEventModal.svelte";

  // Import Modal Stores
  import { modalOpen, modalAction } from "../lib/store/modalStore";
</script>

<div>
  {#if modalOpen}
    <Modal>
      {#if $modalAction === "addEvent"}
        <AddEventModal />
      {/if}
    </Modal>
  {/if}

  <Navbar />
  <CalendarContainer />
</div>
