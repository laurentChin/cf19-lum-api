import { fs, path } from "../dependencies/std.js";

const configDir = path.dirname(path.fromFileUrl(import.meta.url));
const isCustomConfig = /config\.(.)+\.json$/gi;

let customConfigs = {};

for (const file of fs.walkSync(configDir)) {
  if (file.isFile && isCustomConfig.test(file.path)) {
    customConfigs = { ...customConfigs, ...fs.readJsonSync(file.path) };
  }
}

const database = {
  dialect: "postgres",
  host: "localhost",
};

export default {
  ...customConfigs,
  database: {
    ...database,
    ...(customConfigs.database ? customConfigs.database : {}),
  },
  port: 8080,
};
