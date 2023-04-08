import Dexie from "dexie";

class RememberDB extends Dexie {
  constructor() {
    super("rememberDB");
    this.version(1).stores({
      events:
        "++id, title, description, allDay, startDate, startTime, endDate, endTime, createdAt, updatedAt",
    });
  }
}

const db = new RememberDB();
export default db;
