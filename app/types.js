import { gql } from "../dependencies/graphql.js";
import { category } from "./category/category.type.js";

const types = gql`
  ${category}
  type Query {
    categories: [Category]
  }
`;
export default types;
