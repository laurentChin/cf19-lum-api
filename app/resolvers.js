import { queries as Category } from "./category/category.resolvers.js";

const resolvers = {
  Query: {
    ...Category,
  },
};
export default resolvers;
