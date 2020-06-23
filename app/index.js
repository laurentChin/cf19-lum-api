import { Application } from "../dependencies/oak.js";
import { applyGraphQL } from "../dependencies/graphql.js";
import { Database } from "../dependencies/denodb.js";
import { uuid } from "../dependencies/std.js";
import { oakCors } from "../dependencies/cors.js";

import { Category } from "./category/category.model.js";
import { Item } from "./item/item.model.js";
import { Picture } from "./picture/picture.model.js";
import { Set } from "./set/set.model.js";

import config from "../config/config.js";

import types from "./types.js";
import resolvers from "./resolvers.js";

const { dialect, ...dbConfig } = config.database;
const db = new Database(dialect, { ...dbConfig });

db.link([Category, Item, Picture, Set]);

const app = new Application();

const GraphQLService = await applyGraphQL({
  typeDefs: types,

  resolvers,
  context: (ctx) => {
    return {
      db: {
        Category,
        Item,
        Picture,
        Set,
      },
      uuidV4Generator: uuid.v4,
      uploadDirectory: config.uploadDirectory,
    };
  },
});
app.use(oakCors());
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("running on port ", config.port);
await app.listen({ port: config.port });
