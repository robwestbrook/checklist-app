import { writable } from "svelte/store";

export const listItemAddIndex = writable(0);

import { browser } from "$app/environment";
import db from "../data/db.js";

import { convertDateString } from "../library/calendar.js";

const createListItemStore = () => {
  const { subscribe, set, update } = writable([]);

  // Load events from database on store creation
  if (browser) {
    db.listItems.toArray().then((items) => {
      set(items);
    });
  }

  return {
    subscribe,
    addItem: async (data) => {
      const { text, listId, complete } = data;
      const item = {
        text,
        listId,
        complete,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      };
      const id = await db.listItems.add(item);
      update((items) => [...items, { id, ...item }]);
    },
    editItem: async (id, data) => {
      const updateTime = convertDateString(new Date().toLocaleDateString());
      const { text, listId, complete } = data;
      const item = {
        text,
        listId,
        complete,
        updatedAt: updateTime,
      };
      const updated = await db.listItems.update(id, item);
      if (updated) {
        update((items) => {
          return items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                text,
                listId,
                complete,
                updatedAt: updateTime,
              };
            }
            return item;
          });
        });
      }
    },
    deleteItem: async (id) => {
      await db.listItems.delete(id);
      update((items) => items.filter((item) => item.id !== id));
    },
  };
};

export const listItems = createListItemStore();
