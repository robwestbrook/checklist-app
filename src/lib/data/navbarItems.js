/**
 * Navbar Items
 *
 * @description An array of objects used to build the
 * nav bar menu. Each object contains an ID,  a label,
 * and an  action to do when clicked.
 */
export const navbarItems = [
  { id: 1, label: "Add Event", action: "addEvent", params: null },
  { id: 2, label: "Add Note", action: "addNote", params: null },
  { id: 3, label: "Add List", action: "addList", params: null },
  { id: 4, label: "Add Category", action: "addCategory", params: null },
  { id: 5, label: "View Categories", action: "viewCategories", params: null },
  {
    id: 6,
    label: "Backup Database",
    action: "downloadBackup",
    params: "backup",
  },
  {
    id: 7,
    label: "Restore Database",
    action: "uploadFile",
    params: "restore",
  },
];
