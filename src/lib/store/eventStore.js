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

export const addEvent = (data) => {
  events.update((currentEvents) => {
    return [
      ...currentEvents,
      {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        allDay: data.allDay,
        multiDay: data.multiDay,
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
        createdAt: convertDateString(new Date().toLocaleDateString()),
        updatedAt: convertDateString(new Date().toLocaleDateString()),
      },
    ];
  });
};

export const deleteEvent = (id) => {
  events.update((currentEvents) => {
    return currentEvents.filter((event) => event.id !== id);
  });
};

export const getEventsByDate = (date) => {
  return events.filter((event) => event.startDate === date);
};

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
