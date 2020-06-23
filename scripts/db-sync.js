import { Database } from "../dependencies/denodb.js";

import config from "../config/config.js";
import { Category, Item, Picture, Set } from "../app/models.js";

const { dialect, ...dbConfig } = config.database;
const db = new Database(dialect, { ...dbConfig });

db.link([Category, Item, Picture, Set]);

console.log("Attempt to sync database models.");
try {
  await db.sync();
  console.log("Database models have been sync successfully.");
} catch (e) {
  console.log(`Attempt to sync database models fails. (${e})`);
}
