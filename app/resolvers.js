import * as Category from "./category/category.resolvers.js";
import * as Item from "./item/item.resolvers.js";
import * as File from "./file/file.resolvers.js";
import * as Picture from "./picture/picture.resolvers.js";

const resolvers = {
  ...File.enumerations,
  Query: {
    ...Category.queries,
    ...Item.queries,
    ...Picture.queries,
  },

  Mutation: {
    ...Category.mutations,
    ...Item.mutations,
  },
};
export default resolvers;
