import { v4 as uuidv4 } from "uuid";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

import { convertDateString } from "../library/calendar";

// Make sure we're in the browser. Then get the data
// from local storage. If there is no data in local
// storage, data is an empty array.
const data = browser
  ? JSON.parse(window.localStorage.getItem("lifeapp-events")) ?? []
  : [];

// Create store
export const events = writable(data);

// Subscribe method for the store, and push the value
// into local storage.
events.subscribe((value) => {
  if (browser) {
    localStorage.setItem("lifeapp-events", JSON.stringify(value));
  }
});

/**
 * Add Event
 *
 * @description Add an event to storage.
 *
 * @function addEvent
 * @param {Object} data Event form data object
 */
export const addEvent = (data) => {
  const {
    title,
    description,
    allDay,
    multiDay,
    startDate,
    startTime,
    endDate,
    endTime,
  } = data;
  events.update((currentEvents) => {
    return [
      ...currentEvents,
      {
        id: uuidv4(),
        title,
        description,
        allDay,
        multiDay,
        startDate,
        startTime,
        endDate,
        endTime,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      },
    ];
  });
};

/**
 * Delete Event
 *
 * @description Delete an event from storage
 *
 * @function deleteEvent
 * @param {String} id event ID
 */
export const deleteEvent = (id) => {
  events.update((currentEvents) => {
    return currentEvents.filter((event) => event.id !== id);
  });
};

/**
 * Edit Event
 *
 * @description Get an event by ID and update data
 *
 * @function editEvent
 * @param {String} id event ID
 * @param {Object} data form data object
 */
export const editEvent = (id, data) => {
  const {
    title,
    description,
    allDay,
    multiDay,
    startDate,
    startTime,
    endDate,
    endTime,
  } = data;
  const updatedAt = new Date().toLocaleDateString();
  events.update((currentEvents) => {
    return currentEvents.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          title,
          description,
          allDay,
          multiDay,
          startDate,
          startTime,
          endDate,
          endTime,
          updatedAt,
        };
      }
      return event;
    });
  });
};
