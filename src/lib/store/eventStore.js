/**
 * Events Store
 *
 * The base code for this store was generated by
 * ChatAI at https://chat.openai.com/chat, with the
 * question "use dexie.js in a svelte store".
 */
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import db from "../data/db.js";

import { convertDateString } from "../library/calendar.js";

const createEventStore = () => {
  const { subscribe, set, update } = writable([]);

  // Load events from database on store creation
  if (browser) {
    db.events.toArray().then((events) => {
      set(events);
    });
  }

  return {
    subscribe,
    addEvent: async (data) => {
      const {
        title,
        description,
        allDay,
        startDate,
        startTime,
        endDate,
        endTime,
      } = data;
      const event = {
        title,
        description,
        allDay,
        startDate,
        startTime,
        endDate,
        endTime,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      };
      const id = await db.events.add(event);
      update((events) => [...events, { id, ...event }]);
    },
    editEvent: async (id, data) => {
      console.log(`update ID: ${id}`);
      const updateTime = convertDateString(new Date().toLocaleDateString());
      const {
        title,
        description,
        allDay,
        startDate,
        startTime,
        endDate,
        endTime,
      } = data;
      const event = {
        title,
        description,
        allDay,
        startDate,
        startTime,
        endDate,
        endTime,
        updatedAt: updateTime,
      };
      const updated = await db.events.update(id, event);
      if (updated) {
        update((events) => {
          return events.map((event) => {
            if (event.id === id) {
              return {
                ...event,
                title,
                description,
                allDay,
                startDate,
                startTime,
                endDate,
                endTime,
                updatedAt: updateTime,
              };
            }
            return event;
          });
        });
      }
    },
    deleteEvent: async (id) => {
      await db.events.delete(id);
      update((events) => events.filter((event) => event.id !== id));
    },
    restore: async () => {
      db.events.toArray().then((events) => {
        set(events);
      });
    },
  };
};

export const events = createEventStore();
