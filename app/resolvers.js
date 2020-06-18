import * as Category from "./category/category.resolvers.js";

const resolvers = {
  Query: {
    ...Category.queries,
  },

  Mutation: {
    ...Category.mutations,
  },
};
export default resolvers;
