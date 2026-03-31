// beacon\src\utils\indexDB.js

// External libraries
import Dexie from "dexie";

export const db = new Dexie("BeaconDB");

// Increment on id, creating primary key and index
// Can add more fields to index if needed, but for now just id is sufficient
db.version(1).stores({
    locations: "++id"
});