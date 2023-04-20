<script>
  import { backupIndexedDBDatabase } from "../../library/dbFunctions";
  import { version } from "../../library/version";
  import { clickOutside } from "../../library/clickOutside";
  import { navbarItems } from "../../data/navbarItems";
  import NavbarItem from "./NavbarItem.svelte";

  import { modalOpen, modalTitle, modalAction } from "../../store/modalStore";

  let menuOpen = false;

  /**
   * Handle Menu Button
   *
   * @description Toggles the menuOpen variable to
   * toggle the visibility of the navbar meny.
   *
   * @function handleMenuButton
   * @param {Object} e event object
   */
  const handleMenuButton = (e) => {
    menuOpen = !menuOpen;
  };

  /**
   * Handle Click
   *
   * @description Processes the menu item clicked,
   * closes the menu, and sets the modal stores.
   *
   * @function handleClick
   * @param {Object} e event object
   */
  const handleClick = async (e) => {
    if (e.detail.params === "backup") {
      console.log(e.detail.params);
      try {
        let backup = await backupIndexedDBDatabase(
          version.dbName,
          version.dbBackupName
        );
        if (backup) {
          console.log("Backup created");
          alert(
            `Your database has been backed up as ${version.dbBackupName}. Download now`
          );
        } else {
          throw new Error("failed to create backup");
          alert(`There was a problem. Please try again.`);
        }
      } catch (err) {
        console.error("Failed to create backup: ", err);
      }
    } else {
      handleMenuButton();
      $modalTitle = e.detail.label;
      $modalAction = e.detail.action;
      $modalOpen = !$modalOpen;
    }
  };
</script>

<header>
  <div class="bg-fuchsia-700 text-white">
    <nav
      class="
      flex
      w-full
      flex-wrap
      items-center
      justify-between
      p-6
      text-lg
      lg:container
      lg:mx-auto
    "
    >
      <div class="flex items-center">
        <div>
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="h-8 w-8 fill-white md:h-12 md:w-12"
            >
              <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M288 176c48.6 0 88-39.4 88-88s-39.4-88-88-88s-88 39.4-88 88s39.4 88 88 88zM78.7 372.9c15-12.5 50-34.4 97.3-50.1V432H400V322.7c47.3 15.8 82.3 37.7 97.3 50.1c20.4 17 50.6 14.2 67.6-6.1s14.2-50.6-6.1-67.6c-12-10-30.1-22.5-53.2-35C497.2 278.4 481.7 288 464 288c-26.5 0-48-21.5-48-48c0-4.3 .6-8.4 1.6-12.4C379.1 215.9 335.3 208 288 208c-60.2 0-114.9 12.9-160 29.9c0 .7 0 1.4 0 2.1c0 26.5-21.5 48-48 48c-11.8 0-22.7-4.3-31-11.4c-13.1 8.1-23.7 15.9-31.7 22.5c-20.4 17-23.1 47.2-6.1 67.6s47.2 23.1 67.6 6.1zM24 464c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM272 280c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zm56 104c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM96 240c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm368 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z"
              />
            </svg>
          </a>
        </div>
        <div class="px-3">
          <a href="/" class="text-xl font-bold text-white"> Remember </a>
        </div>
      </div>
      <div>
        <button
          on:click={handleMenuButton}
          use:clickOutside
          on:outclick={() => (menuOpen = false)}
          data-testid="menu-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            class="block h-6 w-6 cursor-pointer fill-white lg:hidden"
            viewBox="0 0 448 512"
          >
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>
      </div>
      <div
        class="{menuOpen
          ? ''
          : 'hidden'} w-full lg:flex lg:w-auto lg:items-center lg:transition-none"
        data-testid="menu-div"
      >
        <ul
          class="flex flex-col pt-4 text-base text-white lg:flex-row lg:justify-between lg:pt-2"
        >
          {#each navbarItems as item (item.id)}
            <NavbarItem {item} on:itemClicked={handleClick} />
          {/each}
        </ul>
      </div>
    </nav>
  </div>
</header>
