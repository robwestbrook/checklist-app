import Dexie from "dexie";

class RememberDB extends Dexie {
  constructor() {
    super("rememberDB");
    this.version(2).stores({
      events:
        "++id, title, description, allDay, startDate, startTime, endDate, endTime, createdAt, updatedAt",
      lists: "++id, title, archived, categoryId, createdAt, updatedAt",
      listItems: "++id, text, listId, complete, updatedAt, createdAt",
      categories: "++id, name, createdAt, updatedAt",
      notes: "++id, title, text, archived, categoryId, createdAt, updatedAt",
    });
  }
}

const db = new RememberDB();
export default db;
