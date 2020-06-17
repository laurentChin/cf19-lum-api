import { Database } from "../dependencies/denodb.js";

import config from "../config/config.js";
import { Category } from "../app/category/category.model.js";

const { dialect, ...dbConfig } = config.database;
const db = new Database(dialect, { ...dbConfig });

db.link([Category]);

console.log("Attempt to sync database models.");
try {
  await db.sync();
  console.log("Database models have been sync successfully.");
} catch {
  console.log("Attempt to sync database models fails.");
}
