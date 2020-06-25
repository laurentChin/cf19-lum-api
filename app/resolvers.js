import * as Category from "./category/category.resolvers.js";
import * as Item from "./item/item.resolvers.js";
import * as File from "./file/file.resolvers.js";
import * as Picture from "./picture/picture.resolvers.js";
import * as Set from "./set/set.resolvers.js";

const resolvers = {
  UpdateItemResult: {
    __resolveType: (obj) => {
      return obj.uuid ? "ItemLight" : "Error";
    },
  },
  CreateItemResult: {
    __resolveType: (obj) => {
      return obj.uuid ? "Item" : "Error";
    },
  },
  ...File.enumerations,
  Query: {
    ...Category.queries,
    ...Item.queries,
    ...Picture.queries,
    ...Set.queries,
  },

  Mutation: {
    ...Category.mutations,
    ...Item.mutations,
    ...Set.mutations,
  },
};
export default resolvers;
