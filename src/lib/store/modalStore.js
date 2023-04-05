/**
 * Modal Store
 */
import { writable } from "svelte/store";

export const modalOpen = writable(false);

export const modalTitle = writable("");

export const modalAction = writable("");

export const modalDate = writable("");
