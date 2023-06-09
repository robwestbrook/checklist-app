/**
 * List Store
 *
 * The base code for this store was generated by
 * ChatAI at https://chat.openai.com/chat, with the
 * question "use dexie.js in a svelte store".
 */
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import db from "../data/db.js";

import { convertDateString } from "../library/calendar.js";

const createListStore = () => {
  const { subscribe, set, update } = writable([]);

  // Load lists from database on store creation
  if (browser) {
    db.lists.toArray().then((lists) => {
      set(lists);
    });
  }

  return {
    subscribe,
    addList: async (data) => {
      const { title, categoryId } = data;
      const list = {
        title,
        categoryId,
        archived: false,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      };
      const id = await db.lists.add(list);
      update((lists) => [...lists, { id, ...list }]);
    },
    editList: async (id, data) => {
      const updateTime = convertDateString(new Date().toLocaleDateString());
      const { title, categoryId, archived } = data;
      const list = {
        title,
        categoryId,
        archived,
        updatedAt: updateTime,
      };
      const updated = await db.lists.update(id, list);
      if (updated) {
        update((lists) => {
          return lists.map((list) => {
            if (list.id === id) {
              return {
                ...list,
                title,
                categoryId,
                archived,
                updatedAt: updateTime,
              };
            }
            return list;
          });
        });
      }
    },
    deleteList: async (id) => {
      await db.lists.delete(id);
      update((lists) => lists.filter((list) => list.id !== id));
    },
    restore: async () => {
      db.lists.toArray().then((lists) => {
        set(lists);
      });
    },
    changeUpdatedAtDate: async (id) => {
      const updateTime = convertDateString(new Date().toLocaleDateString());
      const updated = await db.lists.update(id, { updatedAt: updateTime });
      if (updated) {
        update((lists) => {
          return lists.map((list) => {
            if (list.id === id) {
              return {
                ...list,
                updatedAt: updateTime,
              };
            }
            return list;
          });
        });
      }
    },
  };
};

export const lists = createListStore();
