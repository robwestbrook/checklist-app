import { writable } from "svelte/store";

export const showToast = writable(false);

export const toastType = writable("");

export const toastMessage = writable("");
