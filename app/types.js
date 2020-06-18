import { gql } from "../dependencies/graphql.js";
import { category } from "./category/category.type.js";

const types = gql`
  ${category}
  type Query {
    categories: [Category]
    category(uuid: String): Category
  }

  type Mutation {
    createCategory(title: String): Category
    deleteCategory(uuid: String): [Boolean]
  }
`;
export default types;
