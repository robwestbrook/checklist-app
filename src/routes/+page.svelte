<script>
  import { browser } from "$app/environment";
  // Import Components
  import CalendarContainer from "../lib/components/calendar/CalendarContainer.svelte";
  import Modal from "../lib/components/modal/Modal.svelte";

  import ListContainer from "../lib/components/list/ListContainer.svelte";

  import NoteContainer from "../lib/components/notes/NoteContainer.svelte";

  import Footer from "../lib/components/nav/Footer.svelte";

  import Toast from "../lib/components/nav/Toast.svelte";

  // Import Modal Stores
  import { modalOpen, modalAction } from "../lib/store/modalStore";

  import { categories } from "$lib/store/categoryStore";

  /**
   * Initial Category Check
   *
   * @description Checks for existing categories. If a
   * category exists, the app has been used. If not, it's
   * a new app use. Create a default 'home' category.
   */
  const initialCategoryCheck = async () => {
    if (browser) {
      let categoriesExist = await categories.checkForCategories();
      if (!categoriesExist) {
        try {
          await categories.addCategory({ name: "home" });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  initialCategoryCheck();
</script>

<svelte:head>
  <title>Remember</title>
</svelte:head>

<div>
  {#if modalOpen}
    <Modal />
  {/if}

  <CalendarContainer />
  <ListContainer />
  <NoteContainer />
  <Footer />

  <Toast />
</div>
