/**
 * Navbar Items
 *
 * @description An array of objects used to build the
 * nav bar menu. Each object contains an ID,  a label,
 * and an  action to do when clicked.
 */
export const navbarItems = [
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
