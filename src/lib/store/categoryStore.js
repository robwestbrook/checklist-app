/**
 * Category Store
 *
 * The base code for this store was generated by
 * ChatAI at https://chat.openai.com/chat, with the
 * question "use dexie.js in a svelte store".
 */
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import db from "../data/db.js";

import { convertDateString } from "../library/calendar.js";

const createCategoryStore = () => {
  const { subscribe, set, update } = writable([]);

  // Load categories from database on store creation
  if (browser) {
    db.categories.toArray().then((categories) => {
      set(categories);
    });
  }

  return {
    subscribe,
    addCategory: async (data) => {
      const { name } = data;
      const category = {
        name,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      };
      const id = await db.categories.add(category);
      update((categories) => [...categories, { id, ...category }]);
    },
    editCategory: async (id, data) => {
      const updateTime = convertDateString(new Date().toLocaleDateString());
      const { name } = data;
      const category = {
        name,
        updatedAt: updateTime,
      };
      const updated = await db.categories.update(id, category);
      if (updated) {
        update((categories) => {
          return categories.map((category) => {
            if (category.id === id) {
              return {
                ...category,
                name,
                updatedAt: updateTime,
              };
            }
            return category;
          });
        });
      }
    },
    deleteCategory: async (id) => {
      await db.categories.delete(id);
      update((categories) =>
        categories.filter((category) => category.id !== id)
      );
    },
  };
};

export const categories = createCategoryStore();
